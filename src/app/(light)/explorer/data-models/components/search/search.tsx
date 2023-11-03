'use client';
import { useState } from 'react';

import { common } from '@/locale/en/common';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useDebouncedState } from '@react-hookz/web';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import DataModelExplorerCard from '../../../components/data-model-card/data-model-card';
import DataModelExplorerCardLoading from '../../../components/data-model-card/data-model-card-loading';
import SearchFilters from '../../../components/search-filters/search-filters';
import AmountOfIssuancesField from './fields/amount-of-issuances-field';
import ConsumpitonPriceField from './fields/consumpiton-price-field';
import SortByField, { DataModelSortOption } from './fields/sort-by-field';
import TagsField from './fields/tags-field';

export default function DataModelsExplorerSearch() {
  const [search, setSearch] = useDebouncedState('', 500);
  const [selectedSort, setSort] = useState<DataModelSortOption>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedConsumptionPrice, setSelectedConsumptionPrice] = useState<
    number[]
  >([]);
  const [selectedAmountOfIssuances, setSelectedAmountOfIssuances] = useState<
    number[]
  >([]);

  const metadata = useQuery({
    queryKey: ['data-models-metadata'],
    queryFn: () => apiPublic.explorer_data_models_metadata(),
  });

  const tags = metadata.data?.dataModelsMetadata.tags ?? [];
  const consumptionPrice =
    metadata.data?.dataModelsMetadata.consumptionPrice ?? 0;
  const issuedCount = metadata.data?.dataModelsMetadata.issuedCount ?? 0;

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
      selectedSort?.value,
      search,
    ],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_data_models_list({
        filter: {
          tags: selectedTags.length > 0 ? selectedTags : undefined,
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
          search: search.length > 0 ? search : undefined,
        },
        skip: pageParam,
        order: selectedSort?.value,
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
      <SearchFilters onSearch={setSearch}>
        <TagsField
          tags={tags}
          selectedTags={selectedTags}
          setTags={setSelectedTags}
          isLoading={metadata.isLoading}
        />
        <ConsumpitonPriceField
          min={consumptionPrice.min}
          max={consumptionPrice.max}
          selectedConsumptionPrice={selectedConsumptionPrice}
          setConsumptionPrice={setSelectedConsumptionPrice}
          isLoading={metadata.isLoading}
        />
        <AmountOfIssuancesField
          min={issuedCount.min}
          max={issuedCount.max}
          selectedAmountOfIssuances={selectedAmountOfIssuances}
          setAmountOfIssuances={setSelectedAmountOfIssuances}
          isLoading={metadata.isLoading}
        />
        <SortByField selectedSort={selectedSort} onSort={setSort} />
      </SearchFilters>

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
