import { ReactNode } from 'react';

import DefaultError from '@/components/default-error/default-error';
import { common } from '@/locale/en/common';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import ExplorerDataCardLoading from '../data-card/data-card-loading';
import SearchFilters from '../search-filters/search-filters';

type Props = {
  title: string;
  emptyText: string;
  errorMessage: string;
  filters?: ReactNode;
  cards?: ReactNode;
  isLoading: boolean;
  isFetchingMore: boolean;
  isEmpty: boolean;
  isError: boolean;
  hasMore?: boolean;
  onSearch: (search: string) => void;
  fetchMore: () => void;
};

export default function ExplorerSearchSection({
  title,
  emptyText,
  errorMessage,
  filters,
  cards,
  isLoading,
  isFetchingMore,
  isEmpty,
  isError,
  onSearch,
  fetchMore,
  hasMore,
}: Props) {
  return (
    <Container
      component={Stack}
      sx={{
        display: 'flex',
        py: 6,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 4,
        }}
      >
        {title}
      </Typography>
      <SearchFilters onSearch={onSearch}>{filters}</SearchFilters>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={2}
      >
        {isLoading && (
          <>
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
          </>
        )}
        {cards}
        {isFetchingMore && (
          <>
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
          </>
        )}
      </Box>
      {isEmpty && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%', py: 4 }}
        >
          {emptyText}
        </Typography>
      )}
      {isError && (
        <Stack justifyContent="center">
          <DefaultError
            isModal={false}
            hasLink={false}
            message={errorMessage}
          />
        </Stack>
      )}
      {!isFetchingMore && hasMore && (
        <Button
          type="button"
          variant="outlined"
          size="large"
          onClick={() => fetchMore()}
          sx={{ my: 6, alignSelf: 'center' }}
        >
          {common.actions.load_more}
        </Button>
      )}
    </Container>
  );
}
