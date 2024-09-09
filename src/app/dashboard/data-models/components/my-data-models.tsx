'use client';

import { useSession } from 'next-auth/react';
import { useMemo, useRef, useState } from 'react';

import { api } from '@/services/api/api';
import { getAuthHeader } from '@/services/api/client';
import { DataModel, PaginatedResponse } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

import { GridPaginationModel } from '@mui/x-data-grid';

import DataModelList from './data-model-list';

export default function MyDataModels() {
  const { data: session } = useSession({ required: true });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [
      'my-data-models',
      session?.token,
      paginationModel.pageSize,
      paginationModel.page,
    ],
    queryFn: async () => {
      const { data, error } = await api.GET('/data-models/me', {
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

      return data as PaginatedResponse<DataModel>;
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

  return (
    <DataModelList
      dataModels={data?.data ?? []}
      totalRows={rowCount}
      isSuccess={isSuccess}
      isLoading={isFetching}
      paginationModel={paginationModel}
      onChangePage={setPaginationModel}
    />
  );
}
