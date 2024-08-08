'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { defaultGridConfiguration } from '@/components/data-grid/grid-default';
import routes from '@/constants/routes';
import { DataModelType, mockDataModels } from '@/services/server/mock-types';
import { useQuery } from '@tanstack/react-query';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import Empty from './empty';

type DataModel = {
  totalDataModels: number;
  dataModels: DataModelType[];
};

export default function DataModelList() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['storage'],
    queryFn: async (): Promise<DataModel> => {
      const mockPromise = new Promise<DataModel>((resolve) => {
        setTimeout(() => {
          resolve({
            totalDataModels: mockDataModels.length,
            dataModels: mockDataModels,
          });
        }, 1000);
      });
      return mockPromise;
    },
  });

  if (isSuccess && !data?.dataModels?.length) {
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
        rows={data?.dataModels ?? []}
        loading={!data?.dataModels}
        columns={columns}
        paginationMode="server"
        onRowClick={(params: GridRowParams<DataModelType>, event) => {
          //TODO: open the side dialog with current row details
        }}
        pageSizeOptions={[5, 10, 15]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{ ...defaultGridCustomization }}
        rowCount={data?.totalDataModels ?? 0}
      />
    </>
  );
}
