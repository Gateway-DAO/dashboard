import { DATE_FORMAT } from '@/constants/date';
import { DataModel } from '@/services/api/models';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef<DataModel>[] = [
  {
    field: 'title',
    flex: 1.5,
    headerName: 'Title',
    renderCell: (params) => (
      <Typography variant="body1" fontWeight={700}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'id',
    headerName: 'Data model ID',
    flex: 2,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  // {
  //   field: 'dataAssests',
  //   headerName: 'Data model ID',
  //   flex: 1,
  //   renderCell: (params) => <Typography>{params.value}</Typography>,
  // },
  {
    field: 'created_at',
    headerName: 'Created At',
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params.value ? dayjs(params.value).format(DATE_FORMAT) : ''}
      </Typography>
    ),
  },
];
