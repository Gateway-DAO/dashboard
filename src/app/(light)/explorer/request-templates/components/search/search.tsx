'use client';

import DefaultError from '@/components/default-error/default-error';
import { common } from '@/locale/en/common';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useDebouncedState } from '@react-hookz/web';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import ExplorerDataCardLoading from '../../../components/data-card/data-card-loading';
import RequestTemplateExplorerCard from '../../../components/request-template-card/request-template-card';
import SearchFilters from '../../../components/search-filters/search-filters';

export default function DataModelsRequestExplorerSearch() {
  const [search, setSearch] = useDebouncedState('', 500);

  // const metadata = useQuery({
  //   queryKey: ['data-models-metadata'],
  //   queryFn: () => apiPublic.explorer_data_models_metadata(),
  // });

  const requestTemplatesQuery = useInfiniteQuery({
    queryKey: ['data-model-templates', search],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_request_templates_list({
        filter: {},
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataRequestTemplates.length === 12
        ? allPages.length * 12
        : undefined,
  });

  const dataRequestTemplates =
    requestTemplatesQuery.data?.pages?.flatMap(
      ({ dataRequestTemplates }) => dataRequestTemplates
    ) ?? [];

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
      <SearchFilters onSearch={setSearch}></SearchFilters>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={2}
      >
        {requestTemplatesQuery.isLoading && (
          <>
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
          </>
        )}
        {requestTemplatesQuery.isSuccess &&
          dataRequestTemplates.length > 0 &&
          dataRequestTemplates.map((requestTemplate) => (
            <RequestTemplateExplorerCard
              key={requestTemplate.id}
              requestTemplate={requestTemplate}
            />
          ))}
        {requestTemplatesQuery.isFetchingNextPage && (
          <>
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
          </>
        )}
      </Box>
      {requestTemplatesQuery.isSuccess && dataRequestTemplates.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%', py: 4 }}
        >
          {explorerDataModels.empty}
        </Typography>
      )}
      {requestTemplatesQuery.isError && (
        <Stack justifyContent="center">
          <DefaultError
            isModal={false}
            hasLink={false}
            message="Error on searching for data models"
          />
        </Stack>
      )}
      {!requestTemplatesQuery.isFetchingNextPage &&
        requestTemplatesQuery.hasNextPage && (
          <Button
            type="button"
            variant="contained"
            onClick={() => requestTemplatesQuery.fetchNextPage()}
            sx={{ my: 6, alignSelf: 'center' }}
          >
            {common.actions.load_more}
          </Button>
        )}
    </Container>
  );
}
