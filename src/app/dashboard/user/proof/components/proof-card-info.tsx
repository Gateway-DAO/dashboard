import CardCell from '@/components/card-cell/card-cell';
import { PDAStatusChip } from '@/components/pda-card/pda-status-chip';
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
      <CardCell label={proof.share_date}>
        {dayjs(proof?.issuance_date).format('MM/DD/YYYY, h:mm A')}
      </CardCell>

      <CardCell label={proof.status.title}>
        <PDAStatusChip status={proof.status} isProof={true} size="small" />
      </CardCell>
    </Stack>
  );
}
