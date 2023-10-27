'use client';
import CardCell from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import { pda } from '@/locale/en/pda';
import { proof as proofLocale } from '@/locale/en/proof';
import { ProofQuery, ProofStatus } from '@/services/protocol/types';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Divider, Card } from '@mui/material';

type Props = {
  proof: PartialDeep<ProofQuery['proof']> | undefined;
};

export default function ProofCardInfo({ proof }: Props) {
  return (
    <Stack
      component={Card}
      variant="outlined"
      sx={{
        mb: 3,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <TableCellContainer>
        <CardCell label={proofLocale.share_date}>
          {proof?.createdAt ? dayjs(proof?.createdAt).format(DATE_FORMAT) : ''}
        </CardCell>
        {!isNaN(proof?.facilitationFee as number) &&
          proof?.facilitationFee !== 0 && (
            <CardCell label={pda.share.sharing_cost}>
              {`${(proof?.facilitationFee ?? 0).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol',
              })}`}
            </CardCell>
          )}
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={proofLocale.status.title}>
          <TextStatusChip status={proof?.status as ProofStatus} size="small" />
        </CardCell>
      </TableCellContainer>
      {proof?.dataRequest && (
        <TableCellContainer>
          <CardCell label={proofLocale.request_id}>
            <CopyTextButton
              text={proof?.dataRequest?.id as string}
              limit={16}
            />
          </CardCell>
          <CardCell label={proofLocale.request_template_id}>
            <CopyTextButton
              text={proof?.dataRequest?.dataRequestTemplate?.id as string}
              limit={16}
            />
          </CardCell>
        </TableCellContainer>
      )}
    </Stack>
  );
}
