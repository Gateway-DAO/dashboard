import { LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridPaginationModel,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from './grid-default';

type Props = {
  loading: boolean;
  rows: any[];
  columns: GridColDef<any>[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onRowClick?: GridEventListener<'rowClick'>;
  onPaginationModelChange: (newModel: GridPaginationModel) => void;
};

export default function ServerPaginatedDataGrid({
  loading,
  rows,
  columns,
  rowCount,
  paginationModel,
  onRowClick,
  onPaginationModelChange,
}: Props) {
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
        rowCount={rowCount}
        loading={loading}
        onRowClick={onRowClick}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
      />
    </>
  );
}
