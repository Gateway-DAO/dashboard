'use client';
import CardCell from '@/components/card-cell/card-cell';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import { TableCellContainer } from '@/components/table-cell-container/table-cell-container';
import { datamodel } from '@/locale/en/datamodel';
import { pda as pdaLocale } from '@/locale/en/pda';
import {
  CredentialStatus,
  PdaQuery,
  PrivateDataAsset,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import { Stack, Divider, Typography } from '@mui/material';

import CardUsers from './card-users';

type Props = {
  pda: PartialDeep<PrivateDataAsset>;
  viewOnly?: boolean;
};

export default function PdaCardInfo({ pda, viewOnly = false }: Props) {
  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 3,
        boxShadow: 'none',
        backgroundColor: 'common.white',
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers pda={pda} />
      {!viewOnly && (
        <TableCellContainer>
          <CardCell label={pdaLocale.received_at}>
            <Stack direction="row" gap={1}>
              <Stack
                width={24}
                height={24}
                sx={{
                  backgroundColor: 'action.selected',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {pda?.dataAsset?.recipientAuth?.data?.address && (
                  <WalletIcon sx={{ width: 16 }} />
                )}
                {pda?.dataAsset?.recipientAuth?.data?.email && (
                  <MailOutlineIcon sx={{ width: 16 }} />
                )}
              </Stack>
              {limitCharsCentered(
                pda?.dataAsset?.recipientAuth?.data?.address ??
                  pda?.dataAsset?.recipientAuth?.data?.email,
                40
              )}
            </Stack>
          </CardCell>
        </TableCellContainer>
      )}
      <TableCellContainer>
        <CardCell label={pdaLocale.authenticated_by}>
          <Typography>
            {limitCharsCentered(
              pda?.dataAsset?.issuerAuth?.data?.address ??
                pda?.dataAsset?.issuerAuth?.data?.email,
              20
            )}
          </Typography>
        </CardCell>
        <CardCell label={datamodel.data_model_id}>
          {limitCharsCentered(pda?.id ?? '', 6)}
          {/* <c
            text={}
            textSxProps={{ fontSize: 16, fontWeight: 400 }}
            iconSxProps={{ fontSize: 18, top: 4, color: 'text.primary' }}
            href="https://www.google.com"
          /> */}
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={pdaLocale.issuance_date}>
          {dayjs(pda?.createdAt).format('MM/DD/YYYY, h:mm A')}
        </CardCell>
        <CardCell label={pdaLocale.expiration_date}>
          {pda?.dataAsset?.expirationDate
            ? dayjs(pda?.dataAsset?.expirationDate).format('MM/DD/YYYY, h:mm A')
            : pdaLocale.indeterminate}
        </CardCell>
        <CardCell label={pdaLocale.status.title}>
          <PDAStatusChip
            status={pda.dataAsset?.status ?? CredentialStatus.Invalid}
            size="small"
          />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
