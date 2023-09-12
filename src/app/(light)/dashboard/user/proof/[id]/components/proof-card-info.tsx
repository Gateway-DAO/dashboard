import CardCell from '@/components/card-cell/card-cell';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import { TableCellContainer } from '@/components/table-cell-container/table-cell-container';
import { pda } from '@/locale/en/pda';
import { proof as proofLocale } from '@/locale/en/proof';
import {
  CredentialStatus,
  DataResourceStatus,
  Proof,
} from '@/services/protocol/types';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Divider, Card } from '@mui/material';

type Props = {
  proof: PartialDeep<Proof>;
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
          {dayjs(proof?.createdAt).format('MM/DD/YYYY, h:mm A')}
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
          <PDAStatusChip
            status={CredentialStatus.Valid}
            isProof={true}
            size="small"
          />
        </CardCell>
      </TableCellContainer>
      {proof?.dataRequest && (
        <TableCellContainer>
          <CardCell label={proofLocale.request_id}>
            {proof?.dataRequest?.id}
          </CardCell>
          <CardCell label={proofLocale.request_template_id}>
            {proof?.dataRequest?.dataRequestTemplate?.id}
          </CardCell>
        </TableCellContainer>
      )}
    </Stack>
  );
}
