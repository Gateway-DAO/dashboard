'use client';
import Image from 'next/image';

import DataOutlinedIcon from '@/components/icons/data-outlined';
import { DATE_FORMAT } from '@/constants/date';
import { PrivateDataAsset } from '@/services/server/mock-types';
import { formatBytes } from '@/utils/bytes';
import { formatDateDifference } from '@/utils/date';
import { FileType, getFileTypeByPda, getIconFile } from '@/utils/pda';
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

export const columns: GridColDef<PrivateDataAsset>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => {
      const name = params.row.fileName ?? params.row?.dataAsset?.title ?? '';
      const fileType = getFileTypeByPda(params.row);
      const icon = getIconFile(fileType);

      return (
        <Stack direction={'row'} gap={1} alignItems="center">
          {fileType === FileType.pda ? (
            <DataOutlinedIcon color="primary" />
          ) : (
            <Image src={icon} alt={`${fileType} icon`} width={24} height={24} />
          )}
          <Typography sx={{ mx: 2 }}>{limitCharsCentered(name, 30)}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'access',
    headerName: 'Who has access',
    renderCell: (params) => (
      <Typography>{params.row.proofs.length || '-'}</Typography>
    ),
  },
  {
    field: 'size',
    headerName: 'Size',
    renderCell: (params) => (
      <Typography>{formatBytes(params.row.size ?? 0)}</Typography>
    ),
  },
  {
    field: 'expiration',
    headerName: 'Expiration',
    renderCell: (params) => (
      <Typography>{formatDateDifference(params.row.expirationDate)}</Typography>
    ),
  },
  {
    field: 'updatedAt',
    headerName: 'Last modified',
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params.value ? dayjs(params.value).format(DATE_FORMAT) : ''}
      </Typography>
    ),
  },
];
