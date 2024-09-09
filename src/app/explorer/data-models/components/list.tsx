'use client';

import DataCardLoading from '@/components/data-card/data-card-loading';
import DataModelCard from '@/components/data-model-card/data-model-card';
import { api } from '@/services/api/api';
import { DataModel } from '@/services/api/models';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

const LoadingDataModelCards = () => [
  <DataCardLoading key={1} />,
  <DataCardLoading key={2} />,
  <DataCardLoading key={3} />,
  <DataCardLoading key={4} />,
];

export default function DataModelsList() {
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['data-models'],
      queryFn: async ({ pageParam = 1 }) => {
        const { data, error } = await api.GET('/data-models', {
          params: {
            query: {
              page: pageParam,
              page_size: 10,
            },
          },
        });
        if (error) {
          throw new Error(error);
        }
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage.meta?.current_page || !lastPage.meta?.total_pages) {
          return undefined;
        }
        return lastPage.meta?.current_page + 1 <= lastPage.meta?.total_pages
          ? lastPage.meta?.current_page + 1
          : undefined;
      },
    });

  const dataModels =
    (data?.pages.flatMap((page) => page.data) as DataModel[]) ?? [];

  return (
    <Stack
      component={Container}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      sx={{ py: 6 }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 4,
          alignSelf: 'flex-start',
        }}
      >
        All data models
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={2}
        width="100%"
      >
        {dataModels.map((dataModel) => (
          <DataModelCard key={dataModel.id} dataModel={dataModel} />
        ))}
        {(isFetching || isFetchingNextPage) && <LoadingDataModelCards />}
      </Box>
      {hasNextPage && !isFetchingNextPage && (
        <Button variant="outlined" onClick={() => fetchNextPage()}>
          Load more
        </Button>
      )}
    </Stack>
  );
}
