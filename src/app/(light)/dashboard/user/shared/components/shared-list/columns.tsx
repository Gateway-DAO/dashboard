'use client';
import Image from 'next/image';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import { DATE_FORMAT } from '@/constants/date';
import { pdaTableColumnNames } from '@/locale/en/pda';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { FileType, getFileTypeByMime, getIconFile } from '@/utils/pda';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import DownloadIcon from '@mui/icons-material/Download';
import { Stack, Typography } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  renderActionsCell,
} from '@mui/x-data-grid';

export const columns: GridColDef<PrivateDataAsset>[] = [
  {
    field: 'name',
    headerName: pdaTableColumnNames.name,
    flex: 2,
    renderCell: (params) => {
      let name = '****';
      if (params.row.structured && params.row.dataAsset?.title) {
        name = params.row.dataAsset.title;
      } else if (params.row.fileName) {
        name = params.row.fileName;
      }

      const fileType = getFileTypeByMime(params.row);
      const icon = getIconFile(fileType);

      return (
        <Stack direction={'row'} justifyContent={'space-between'}>
          {fileType === FileType.pda ? (
            <DataOutlinedIcon color="primary" />
          ) : (
            <Image src={icon} alt={`${fileType} icon`} width={24} height={24} />
          )}
          <Typography variant="body1" sx={{ mx: 2 }}>
            {name}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'uploaded by',
    headerName: pdaTableColumnNames.uploadedBy,
    flex: 1,
    renderCell: (params) => (
      <Stack direction={'row'}>
        <GTWAvatar
          name={params.row.issuer.did}
          alt={params.row.issuer.username}
        />
        <Typography variant="body1" sx={{ mx: 2, mt: 1 }}>
          {params.row.issuer.username ??
            limitCharsCentered(params.row.issuer.did, 10)}
        </Typography>
      </Stack>
    ),
  },
  // {
  //   field: 'sharing',
  //   headerName: pdaTableColumnNames.sharing,
  //   renderCell: (params) => (
  //     <Typography variant="body1" fontWeight={700}>
  //       -
  //     </Typography>
  //   ),
  // },
  {
    field: 'issuanceDate',
    headerName: pdaTableColumnNames.lastModified,
    flex: 1,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
  {
    field: 'action',
    type: 'actions',
    renderCell(params) {
      if (params.row.structured) return null;

      return renderActionsCell(params);
    },
    getActions: () => [
      // <GridActionsCellItem
      //   key={1}
      //   label="Share"
      //   icon={<IosShareIcon />}
      //   showInMenu
      // />,
      <GridActionsCellItem
        label="Download"
        key={2}
        icon={<DownloadIcon />}
        showInMenu
      />,
      // <GridActionsCellItem
      //   key={3}
      //   label="Archive"
      //   icon={<ArchiveIcon />}
      //   showInMenu
      // />,
    ],
  },
];
