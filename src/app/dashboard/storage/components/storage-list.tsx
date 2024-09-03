'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useMemo, useRef, useState } from 'react';

import ServerPaginatedDataGrid from '@/components/data-grid/server-paginated-data-grid';
import routes from '@/constants/routes';
import { api, createAuthHeader } from '@/services/api/api';
import { PaginatedResponse, PublicDataAsset } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

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
      const { data, error } = await api.GET('/data-assets/me', {
        headers: createAuthHeader(session?.token),
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

  const rowCountRef = useRef(data?.meta?.total_items || 0);

  const rowCount = useMemo(() => {
    if (data?.meta?.total_items !== undefined) {
      rowCountRef.current = data.meta.total_items;
    }
    return rowCountRef.current;
  }, [data?.meta?.total_items]);

  if (isSuccess && !data?.data?.length) {
    return <Empty />;
  }

  return (
    <>
      <ServerPaginatedDataGrid
        rows={data?.data ?? []}
        loading={isFetching}
        columns={columns}
        onRowClick={(params: GridRowParams<PublicDataAsset>) => {
          return router.push(routes.dashboard.asset(params.id));
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={rowCount}
      />
    </>
  );
}
