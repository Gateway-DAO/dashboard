'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useMemo, useRef, useState } from 'react';

import ServerPaginatedDataGrid from '@/components/data-grid/server-paginated-data-grid';
import routes from '@/constants/routes';
import { api, getAuthHeader } from '@/services/api/api';
import { PaginatedResponse, PublicDataAsset } from '@/services/api/models';
import { formatBytes } from '@/utils/bytes';
import { useQuery } from '@tanstack/react-query';

import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import Empty from './empty';

export default function StorageList() {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const { data: session } = useSession({ required: true });

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [
      'my-data-models',
      session?.token,
      paginationModel.pageSize,
      paginationModel.page,
    ],
    queryFn: async () => {
      const { data, error } = await api.GET('/data-assets/created', {
        headers: getAuthHeader(session?.token),
        params: {
          query: {
            page: paginationModel.page + 1,
            page_size: paginationModel.pageSize,
          },
        },
      });

      if (error) {
        throw new Error(error);
      }

      if (!data) {
        throw new Error('No data');
      }

      return data as PaginatedResponse<PublicDataAsset>;
    },
    enabled: !!session?.token,
  });

  const totalAssetsRef = useRef(data?.meta?.total_items);

  const totalAssets = useMemo(() => {
    if (data?.meta?.total_items !== undefined) {
      totalAssetsRef.current = data.meta.total_items;
    }
    return totalAssetsRef.current;
  }, [data?.meta?.total_items]);

  const storageSize = useMemo(() => {
    if (!session?.user) {
      return undefined;
    }

    return formatBytes(session.user.storage_size ?? 0);
  }, [session?.user?.storage_size]);

  return (
    <>
      <Stack gap={2} mt={2} direction="row">
        <Stack
          component={Paper}
          elevation={0}
          justifyContent="space-between"
          gap={1}
          sx={{ p: 2, backgroundColor: 'primary.100', flex: 1 }}
        >
          <Typography variant="caption" color="primary.dark">
            Data assets
          </Typography>
          <Typography variant="h5" color="primary.dark">
            {totalAssets ?? <Skeleton variant="text" width={64} />}
          </Typography>
        </Stack>
        <Stack
          component={Paper}
          elevation={0}
          justifyContent="space-between"
          gap={1}
          sx={{ p: 2, backgroundColor: 'primary.100', flex: 1 }}
        >
          <Typography variant="caption" color="primary.dark">
            Total storage
          </Typography>
          <Typography variant="h5" color="primary.dark">
            {storageSize ?? <Skeleton variant="text" width={64} />}
          </Typography>
        </Stack>
      </Stack>
      {isSuccess && !data?.data?.length ? (
        <Empty />
      ) : (
        <ServerPaginatedDataGrid
          rows={data?.data ?? []}
          loading={isFetching}
          columns={columns}
          onRowClick={(params: GridRowParams<PublicDataAsset>) => {
            return router.push(routes.dashboard.storageAsset(params.id));
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={totalAssets}
        />
      )}
    </>
  );
}
