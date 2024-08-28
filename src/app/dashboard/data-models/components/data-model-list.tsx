'use client';

import { useState } from 'react';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { defaultGridConfiguration } from '@/components/data-grid/grid-default';
import { DataModelType, mockDataModels } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import { DataModelDialog } from './data-model-dialog';
import Empty from './empty';

type DataModel = {
  totalDataModels: number;
  dataModels: DataModelType[];
};

export default function DataModelList() {
  const [isDataModelDialog, setDataModelDialog] = useState<boolean>(false);
  const [selectedDataModel, setSelectedDataModel] = useState<DataModelType>();

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
        onRowClick={(params: GridRowParams<DataModelType>) => {
          setDataModelDialog(true);
          setSelectedDataModel(params.row);
        }}
        pageSizeOptions={[5, 10, 15]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
        rowCount={data?.totalDataModels ?? 0}
      />
      <DataModelDialog
        open={isDataModelDialog}
        onClose={() => setDataModelDialog(false)}
        dataModelId={selectedDataModel?.dataModelId as string}
      />
    </>
  );
}
