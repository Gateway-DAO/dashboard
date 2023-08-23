'use client';
import CardCell from '@/components/card-cell/card-cell';
import ExternalLink from '@/components/external-link/external-link';
import { protocol } from '@/locale/en/protocol';
import { CredentialStatus, PdaQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import { Stack, Divider, Chip, Typography } from '@mui/material';

import CardUsers from './card-users';
import { TableCellContainer } from './table-cell-container';

type Props = {
  pda: PdaQuery['credential'];
};

export default function PdaCardInfo({ pda }: Props) {
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
      <TableCellContainer>
        <CardCell label={protocol.pda.received_at}>
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
              {pda?.recipientAuth?.data?.wallet && (
                <WalletIcon sx={{ width: 16 }} />
              )}
              {pda?.recipientAuth?.data?.email && (
                <MailOutlineIcon sx={{ width: 16 }} />
              )}
            </Stack>
            {pda?.recipientAuth?.data?.wallet ??
              pda?.recipientAuth?.data?.email}
          </Stack>
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={protocol.pda.authenticated_by}>
          <Typography>
            {limitCharsCentered(
              pda?.issuerAuth?.data?.address ?? pda?.issuerAuth?.data?.email,
              20
            )}
          </Typography>
        </CardCell>
        <CardCell label={protocol.data_model.data_model_id}>
          <ExternalLink
            text={limitCharsCentered(pda?.id, 6)}
            textSxProps={{ fontSize: 16, fontWeight: 400 }}
            iconSxProps={{ fontSize: 18, top: 4, color: 'text.primary' }}
            href="https://www.google.com"
          />
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={protocol.pda.issuance_date}>
          {dayjs(pda?.createdAt).format('MM/DD/YYYY, h:mm A')}
        </CardCell>
        <CardCell label={protocol.pda.expiration_date}>
          {pda?.expirationDate
            ? dayjs(pda?.expirationDate).format('MM/DD/YYYY, h:mm A')
            : protocol.pda.indeterminate}
        </CardCell>
        <CardCell label={protocol.pda.status}>
          {pda?.status === CredentialStatus.Valid && (
            <Chip
              label={protocol.pda.valid}
              size="small"
              variant="filled"
              color="success"
            />
          )}
          {pda?.status === CredentialStatus.Suspended && (
            <Chip
              label={protocol.pda.suspended}
              size="small"
              variant="filled"
              color="warning"
            />
          )}
          {pda?.status === CredentialStatus.Revoked && (
            <Chip
              label={protocol.pda.revoked}
              size="small"
              variant="filled"
              color="warning"
            />
          )}
          {pda?.status === CredentialStatus.Revoked && (
            <Chip
              label={protocol.pda.invalid}
              size="small"
              variant="filled"
              color="error"
            />
          )}
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
