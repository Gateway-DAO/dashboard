'use client';

import { useState } from 'react';

import { defaultGridCustomization } from '@/components/data-grid/grid-default';
import { defaultGridConfiguration } from '@/components/data-grid/grid-default';
import { DataModel } from '@/services/api/models';

import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import { columns } from './columns';
import { DataModelDialog } from './data-model-dialog';
import Empty from './empty';

type Props = {
  isLoading: boolean;
  isSuccess: boolean;
  data?: DataModel[];
};

export default function DataModelList({ isLoading, isSuccess, data }: Props) {
  const [dataModelDialog, setDataModelDialog] = useState<{
    isOpen: boolean;
    dataModel?: DataModel;
  }>({ isOpen: false });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  if (isSuccess && !data?.length) {
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
        rows={data ?? []}
        loading={!data}
        columns={columns}
        paginationMode="server"
        onRowClick={(params: GridRowParams<DataModel>) => {
          setDataModelDialog({ isOpen: true, dataModel: params.row });
        }}
        pageSizeOptions={[5, 10, 15]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
        rowCount={data?.length ?? 0}
      />
      <DataModelDialog
        open={dataModelDialog.isOpen}
        dataModel={dataModelDialog.dataModel}
        onClose={() => setDataModelDialog((old) => ({ ...old, isOpen: false }))}
      />
    </>
  );
}
