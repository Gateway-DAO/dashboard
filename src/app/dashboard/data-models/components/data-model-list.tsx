'use client';

import { useState } from 'react';

import ServerPaginatedDataGrid from '@/components/data-grid/server-paginated-data-grid';
import { DataModel } from '@/services/api/models';

import { GridPaginationModel, GridRowParams } from '@mui/x-data-grid';

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
      <ServerPaginatedDataGrid
        rows={dataModels}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={onChangePage}
        rowCount={totalRows}
        loading={isLoading}
        onRowClick={(params: GridRowParams<DataModel>) => {
          setDataModelDialog({ isOpen: true, dataModel: params.row });
        }}
      />
      <DataModelDialog
        open={dataModelDialog.isOpen}
        dataModel={dataModelDialog.dataModel}
        onClose={() => setDataModelDialog((old) => ({ ...old, isOpen: false }))}
      />
    </>
  );
}
