'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import routes from '@/constants/routes';
import { mockPrivateDataAssets } from '@/services/api/mocks';
import { PrivateDataAsset } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import Empty from './empty';

type UserStorage = {
  totalPDAs: number;
  pdas: PrivateDataAsset[];
};

export default function StorageList() {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['storage'],
    queryFn: async (): Promise<UserStorage> => {
      const mockPromise = new Promise<UserStorage>((resolve) => {
        setTimeout(() => {
          resolve({
            totalPDAs: mockPrivateDataAssets.length,
            pdas: mockPrivateDataAssets,
          });
        }, 1000);
      });
      return mockPromise;
    },
  });

  if (isSuccess && !data?.pdas?.length) {
    return <Empty />;
  }

  return (
    <>
      {isLoading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: {
              xs: 0,
              lg: '300px',
            },
            width: '100%',
          }}
        />
      )}
      <DataGrid
        {...defaultGridConfiguration}
        rows={data?.pdas ?? []}
        loading={!data?.pdas}
        columns={columns}
        onRowClick={(params: GridRowParams<PrivateDataAsset>, event) => {
          // if middle click open new tab
          if (event.button === 1) {
            return window.open(routes.dashboard.asset(params.id));
          }
          return router.push(routes.dashboard.asset(params.id));
        }}
        pageSizeOptions={[5, 10, 15]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
        rowCount={data?.totalPDAs ?? 0}
      />
    </>
  );
}
