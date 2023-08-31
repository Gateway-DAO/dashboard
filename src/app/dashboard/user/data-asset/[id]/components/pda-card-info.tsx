'use client';
import CardCell from '@/components/card-cell/card-cell';
import CopyPaste from '@/components/copy-paste/copy-paste';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import { TableCellContainer } from '@/components/table-cell-container/table-cell-container';
import { datamodel } from '@/locale/en/datamodel';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import { Stack, Divider, Typography } from '@mui/material';

import CardUsers from './card-users';

type Props = {
  pda: PdaQuery['credential'];
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
        overflow: 'hidden',
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
                {pda?.recipientAuth?.data?.address && (
                  <WalletIcon sx={{ width: 16 }} />
                )}
                {pda?.recipientAuth?.data?.email && (
                  <MailOutlineIcon sx={{ width: 16 }} />
                )}
              </Stack>
              {limitCharsCentered(
                pda?.recipientAuth?.data?.address ??
                  pda?.recipientAuth?.data?.email,
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
              pda?.issuerAuth?.data?.address ?? pda?.issuerAuth?.data?.email,
              20
            )}
          </Typography>
        </CardCell>
        <CardCell label={datamodel.data_model_id} margin={false}>
          <CopyPaste text={pda?.id} limit={12} />
          {/* <ExternalLink
            text={limitCharsCentered(pda?.id, 6)}
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
          {pda?.expirationDate
            ? dayjs(pda?.expirationDate).format('MM/DD/YYYY, h:mm A')
            : pdaLocale.indeterminate}
        </CardCell>
        <CardCell label={pdaLocale.status.title}>
          <PDAStatusChip status={pda.status} size="small" />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
