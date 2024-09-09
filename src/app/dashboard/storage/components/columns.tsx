'use client';

import Link from 'next/link';

import routes from '@/constants/routes';
import { PublicDataAsset } from '@/services/api/models';
import { formatBytes } from '@/utils/bytes';
import { formatDate, formatDateDifference } from '@/utils/date';
import { getFileTypeByMimeType, getIconFile } from '@/utils/pda';
import { limitCharsCentered } from '@/utils/string';

import { Typography, Link as MuiLink } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef<PublicDataAsset>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => {
      const name = params.row.name ?? '';
      const fileType = getFileTypeByMimeType(params.row!.type);
      const Icon = getIconFile(fileType);

      // TODO: implement file type icon
      return (
        <MuiLink
          component={Link}
          href={routes.dashboard.asset(params.row.id!)}
          alignItems="end"
          underline="hover"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Icon color="primary" />
          <Typography component="span" variant="body1" sx={{ color: 'black' }}>
            {limitCharsCentered(name, 30)}
          </Typography>
        </MuiLink>
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
        {params.row.updated_at ? formatDate(params.row.updated_at) : ''}
      </Typography>
    ),
  },
];
