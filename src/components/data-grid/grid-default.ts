import { GatewaySxProps } from '@/theme';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { DataGridProps } from '@mui/x-data-grid';

export const defaultGridConfiguration: Partial<DataGridProps> = {
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableColumnSelector: true,
  disableRowSelectionOnClick: true,
  paginationMode: 'server',
  autoHeight: true,
};

export const defaultGridCustomization: GatewaySxProps = {
  mx: NEGATIVE_CONTAINER_PX,
  border: 'none',
  mb: 4,
  borderRadius: 0,
  // '& .MuiDataGrid-cell:focus': {
  //   outline: 'none',
  // },
  // '& .MuiDataGrid-footerContainer': {
  //   paddingRight: CONTAINER_PX,
  // },
  // '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-footerContainer': {
  //   border: 'none',
  // },
  // '& .MuiDataGrid-columnHeader:first-child, & .MuiDataGrid-cell:first-child': {
  //   paddingLeft: CONTAINER_PX,
  // },
  // '& .MuiDataGrid-columnHeader:last-child, & .MuiDataGrid-cell:last-child': {
  //   paddingRight: CONTAINER_PX,
  // },
  // '.MuiDataGrid-row': {
  //   cursor: 'pointer',
  // },
};

export const gridWithoutNegativeMargin: GatewaySxProps = {
  border: 'none',
  mb: 4,
  borderRadius: 0,
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-footerContainer': {
    paddingRight: CONTAINER_PX,
  },
  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-footerContainer': {
    border: 'none',
  },
  '.MuiDataGrid-row': {
    cursor: 'pointer',
  },
};
