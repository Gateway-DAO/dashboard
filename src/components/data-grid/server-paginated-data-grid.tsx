import { LinearProgress } from '@mui/material';
import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from './grid-default';

export default function ServerPaginatedDataGrid<
  Model extends GridValidRowModel = any
>({
  loading,
  rows,
  columns,
  rowCount,
  paginationModel,
  onRowClick,
  onPaginationModelChange,
}: DataGridProps<Model>) {
  return (
    <>
      {loading && (
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
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 15, 20]}
        disableColumnFilter
        disableColumnSorting
        rowCount={rowCount}
        loading={loading}
        onRowClick={onRowClick}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
      />
    </>
  );
}
