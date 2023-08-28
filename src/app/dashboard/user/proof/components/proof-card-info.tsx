import CardCell from '@/components/card-cell/card-cell';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
import { TableCellContainer } from '@/components/table-cell-container/table-cell-container';
import { pda } from '@/locale/en/pda';
import { proof as proofLocale } from '@/locale/en/proof';
import dayjs from 'dayjs';

import { Stack, Divider } from '@mui/material';

type Props = {
  proof: any; // TODO: Add type
};

export default function ProofCardInfo({ proof }: Props) {
  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 3,
        backgroundColor: 'common.white',
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <TableCellContainer>
        <CardCell label={proofLocale.share_date}>
          {dayjs(proof?.issuance_date).format('MM/DD/YYYY, h:mm A')}
        </CardCell>
        {!isNaN(proof?.sharing_cost) && (
          <CardCell label={pda.share.sharing_cost}>
            {`${(proof?.sharing_cost ?? 0).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'symbol',
            })}`}
          </CardCell>
        )}
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={proofLocale.status.title}>
          <PDAStatusChip status={proof.status} isProof={true} size="small" />
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
