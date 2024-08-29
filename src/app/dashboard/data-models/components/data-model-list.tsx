'use client';

import { useState } from 'react';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { defaultGridConfiguration } from '@/components/data-grid/grid-default';
import { DataModel } from '@/services/api/models';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridPaginationModel, GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import { DataModelDialog } from './data-model-dialog';
import Empty from './empty';

type Props = {
  dataModels: DataModel[];
  totalRows: number;
  isSuccess: boolean;
  isLoading: boolean;
  paginationModel: GridPaginationModel;
  onChangePage: (newModel: GridPaginationModel) => void;
};

export default function DataModelList({
  dataModels,
  totalRows,
  isSuccess,
  isLoading,
  paginationModel,
  onChangePage,
}: Props) {
  const [dataModelDialog, setDataModelDialog] = useState<{
    isOpen: boolean;
    dataModel?: DataModel;
  }>({ isOpen: false });

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
        onPaginationModelChange={onChangePage}
        pageSizeOptions={[10, 15, 20]}
        rowCount={totalRows}
        loading={isLoading}
        onRowClick={(params: GridRowParams<DataModel>) => {
          setDataModelDialog({ isOpen: true, dataModel: params.row });
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
