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
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-footerContainer': {
    paddingRight: CONTAINER_PX,
  },
  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-footerContainer': {
    border: 'none',
  },
  '.MuiDataGrid-cell': {
    alignContent: 'center',
  },
  '& .MuiDataGrid-columnHeader[aria-colindex="1"], & .MuiDataGrid-cell[aria-colindex="1"]':
    {
      paddingLeft: {
        xs: CONTAINER_PX.xs + 10 / 8,
        md: CONTAINER_PX.md + 10 / 8,
        lg: CONTAINER_PX.lg + 10 / 8,
      },
    },
  '& .MuiDataGrid-columnHeader--last, & .MuiDataGrid-row .MuiDataGrid-cell:last-child':
    {
      paddingRight: {
        xs: CONTAINER_PX.xs + 10 / 8,
        md: CONTAINER_PX.md + 10 / 8,
        lg: CONTAINER_PX.lg + 10 / 8,
      },
    },
  '.MuiDataGrid-row': {
    cursor: 'pointer',
  },
};

export const gridWithoutNegativeMargin: GatewaySxProps = {
  mb: 4,
  border: 'none',
  borderRadius: 0,
  '& .MuiDataGrid-cell': {
    alignContent: 'center',
  },

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
