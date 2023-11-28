'use client';

import { issuePda } from '@/locale/en/pda';
import { PrivateDataAsset } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { CheckOutlined } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';

import PDAsTable from './pdas-table';

type Props = {
  pdas: PartialDeep<PrivateDataAsset>[];
};

export default function IssuanceSuccess({ pdas }: Props) {
  return (
    <>
      <Stack sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
        <Avatar
          sx={{ backgroundColor: 'success.main', color: 'action.active' }}
        >
          <CheckOutlined />
        </Avatar>
      </Stack>
      <Stack py={3}>
        <Typography variant="h4" mb={5}>
          {issuePda.success_title}
        </Typography>
        <PDAsTable data={pdas} totalCount={pdas?.length ?? 0} />
      </Stack>
    </>
  );
}
