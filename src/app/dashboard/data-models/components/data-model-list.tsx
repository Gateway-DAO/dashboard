'use client';

import { useState } from 'react';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { defaultGridConfiguration } from '@/components/data-grid/grid-default';
import { DataModel, PaginatedResponse } from '@/services/api/models';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridPaginationModel, GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import { DataModelDialog } from './data-model-dialog';
import Empty from './empty';

type Props = {
  isLoading: boolean;
  isSuccess: boolean;
  dataModels: DataModel[];
  totalLoadedPages: number;
  hasNextPage: boolean;
  totalRows: number;
  fetchNextPage: () => void;
};

export default function DataModelList({
  isLoading,
  isSuccess,
  dataModels,
  totalRows,
  totalLoadedPages,
  hasNextPage,
  fetchNextPage,
}: Props) {
  const [dataModelDialog, setDataModelDialog] = useState<{
    isOpen: boolean;
    dataModel?: DataModel;
  }>({ isOpen: false });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
    if (newModel.page + 1 > totalLoadedPages && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isSuccess && !dataModels?.length) {
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
        rows={dataModels}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[10, 15, 20]}
        rowCount={totalRows}
        loading={isLoading}
        onRowClick={(params: GridRowParams<DataModel>) => {
          setDataModelDialog({ isOpen: true, dataModel: params.row });
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
      />
      <DataModelDialog
        open={dataModelDialog.isOpen}
        dataModel={dataModelDialog.dataModel}
        onClose={() => setDataModelDialog((old) => ({ ...old, isOpen: false }))}
      />
    </>
  );
}
