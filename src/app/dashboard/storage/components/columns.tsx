'use client';

import DataOutlinedIcon from '@/components/icons/data-outlined';
import { DATE_FORMAT } from '@/constants/date';
import { PublicDataAsset } from '@/services/api/models';
import { formatBytes } from '@/utils/bytes';
import { formatDateDifference } from '@/utils/date';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

export const columns: GridColDef<PublicDataAsset>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => {
      const name = params.row.name ?? '';
      // TODO: implement file type icon
      return (
        <Stack direction={'row'} gap={1} alignItems="end">
          <DataOutlinedIcon color="primary" />
          <Typography sx={{ mx: 2 }}>{limitCharsCentered(name, 30)}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'access',
    headerName: 'Who has access',
    width: 150,
    renderCell: (params) => (
      <Typography>{params.row.roles?.length || '-'}</Typography>
    ),
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 150,

    renderCell: (params) => (
      <Typography>{formatBytes(params.row.size ?? 0)}</Typography>
    ),
  },
  {
    field: 'expiration',
    headerName: 'Expiration',
    width: 150,

    renderCell: (params) => (
      <Typography>
        {formatDateDifference(params.row.expiration_date)}
      </Typography>
    ),
  },
  {
    field: 'updated_at',
    headerName: 'Last modified',
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params.row.updated_at
          ? dayjs(params.row.updated_at).format(DATE_FORMAT)
          : ''}
      </Typography>
    ),
  },
];
