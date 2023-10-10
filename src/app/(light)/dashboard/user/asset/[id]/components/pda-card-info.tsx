'use client';
import CardCell from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { datamodel } from '@/locale/en/datamodel';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaStatus, PdaQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import { Stack, Divider, Typography, Card } from '@mui/material';

import CardUsers from './card-users';

type Props = {
  pda: PartialDeep<PdaQuery['PDA'] | null>;
  viewOnly?: boolean;
};

export default function PdaCardInfo({ pda, viewOnly = false }: Props) {
  return (
    <Stack
      component={Card}
      variant="outlined"
      sx={{ mb: 3, overflow: 'visible' }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers pda={pda} />
      {/* {!viewOnly && (
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
                {pda?.dataAsset?.owner?.data?.address && (
                  <WalletIcon sx={{ width: 16 }} />
                )}
                {pda?.dataAsset?.owner?.data?.email && (
                  <MailOutlineIcon sx={{ width: 16 }} />
                )}
              </Stack>
              {limitCharsCentered(
                pda?.dataAsset?.owner?.data?.address ??
                  pda?.dataAsset?.owner?.data?.email,
                40
              )}
            </Stack>
          </CardCell>
        </TableCellContainer>
      )} */}
      <TableCellContainer>
        {pda?.dataAsset?.organization && (
          <CardCell label={pdaLocale.authenticated_by}>
            <Typography>
              {limitCharsCentered(
                pda?.dataAsset?.issuer?.gatewayId ??
                  pda?.dataAsset?.issuer?.email ??
                  pda?.dataAsset?.issuer?.id ??
                  '',
                20
              )}
            </Typography>
          </CardCell>
        )}
        <CardCell label={datamodel.data_model_id} margin={false}>
          {
            <CopyTextButton
              text={pda?.dataAsset?.dataModel?.id as string}
              limit={6}
            />
          }
          {/* <ExternalLink
            text={}
            textSxProps={{ fontSize: 16, fontWeight: 400 }}
            iconSxProps={{ fontSize: 18, top: 4, color: 'text.primary' }}
            href="https://www.google.com"
          /> */}
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={pdaLocale.issuance_date}>
          {pda?.issuanceDate
            ? dayjs(pda?.issuanceDate).format(DATE_FORMAT)
            : ''}
        </CardCell>
        <CardCell label={pdaLocale.expiration_date}>
          {pda?.dataAsset?.expirationDate
            ? dayjs(pda?.dataAsset?.expirationDate).format(DATE_FORMAT)
            : pdaLocale.indeterminate}
        </CardCell>
        <CardCell label={pdaLocale.status.title}>
          <PDAStatusChip
            status={pda?.status ?? PdaStatus.Valid}
            size="small"
            id="pda-status"
          />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
