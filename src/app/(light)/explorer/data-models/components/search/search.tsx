'use client';
import { useState } from 'react';

import { common } from '@/locale/en/common';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import DataModelExplorerCard from '../../../components/data-model-card/data-model-card';
import DataModelExplorerCardLoading from '../../../components/data-model-card/data-model-card-loading';
import AmountOfIssuancesField from './fields/amount-of-issuances-field';
import ConsumpitonPriceField from './fields/consumpiton-price-field';
import SortByField from './fields/sort-by-field';
import TagsField from './fields/tags-field';
import DataModelsExplorerSearchFilters from './filters';

export default function DataModelsExplorerSearch() {
  const [selectedTags, setSelectedTags] = useState<string[]>();
  const [selectedConsumptionPrice, setSelectedConsumptionPrice] = useState<
    number[]
  >([]);
  const [selectedAmountOfIssuances, setSelectedAmountOfIssuances] = useState<
    number[]
  >([]);

  const dataModels = useInfiniteQuery({
    queryKey: [
      'data-models',
      selectedTags,
      selectedConsumptionPrice,
      selectedConsumptionPrice[0],
      selectedConsumptionPrice[1],
      selectedAmountOfIssuances,
      selectedAmountOfIssuances[0],
      selectedAmountOfIssuances[1],
    ],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_data_models_list({
        filter: {
          tags: selectedTags,
          consumptionPrice:
            selectedConsumptionPrice.length > 0
              ? {
                  min: selectedConsumptionPrice[0],
                  max: selectedConsumptionPrice[1],
                }
              : undefined,
          issuedCount:
            selectedAmountOfIssuances.length > 0
              ? {
                  min: selectedAmountOfIssuances[0],
                  max: selectedAmountOfIssuances[1],
                }
              : undefined,
        },
        skip: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataModels.length === 12 ? allPages.length * 12 : undefined,
  });

  return (
    <Container
      component={Stack}
      sx={{
        display: 'flex',
        py: 3,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        {explorerDataModels.listTitle}
      </Typography>
      <DataModelsExplorerSearchFilters
        onSearch={() => {}}
        isSearching={dataModels.isFetching}
      >
        <TagsField selectedTags={selectedTags} setTags={setSelectedTags} />
        <ConsumpitonPriceField
          selectedConsumptionPrice={selectedConsumptionPrice}
          setConsumptionPrice={setSelectedConsumptionPrice}
        />
        <AmountOfIssuancesField
          selectedAmountOfIssuances={selectedAmountOfIssuances}
          setAmountOfIssuances={setSelectedAmountOfIssuances}
        />
        <SortByField />
      </DataModelsExplorerSearchFilters>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={3}
      >
        {dataModels.isLoading && (
          <>
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
          </>
        )}
        {dataModels.data?.pages?.flatMap(({ dataModels }) =>
          dataModels.map((dataModel) => (
            <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
          ))
        )}
        {dataModels.isFetchingNextPage && (
          <>
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
          </>
        )}
      </Box>
      {!dataModels.isFetchingNextPage && dataModels.hasNextPage && (
        <Button
          type="button"
          variant="contained"
          onClick={() => dataModels.fetchNextPage()}
          sx={{ my: 6, alignSelf: 'center' }}
        >
          {common.actions.load_more}
        </Button>
      )}
    </Container>
  );
}
