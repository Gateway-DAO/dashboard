import CardCell from '@/components/card-cell/card-cell';
import { protocol } from '@/locale/en/protocol';
import dayjs from 'dayjs';

import { Stack, Divider, Chip } from '@mui/material';

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
      {/* TODO: Add dynamic information */}
      <CardCell label={protocol.pda.share_date}>
        {dayjs(proof?.issuance_date).format('MM/DD/YYYY, h:mm A')}
      </CardCell>

      {/* TODO: Add dynamic information */}
      <CardCell label={protocol.data_model.pdas_table.status}>
        {/* TODO: Add types */}
        {proof?.status === 'valid' && (
          <Chip
            label={protocol.pda.up_to_date}
            size="small"
            variant="filled"
            color="success"
          />
        )}
        {/* TODO: Add types */}
        {proof?.status === 'invalid' && (
          <Chip
            label={protocol.data_model.pdas_table.status}
            size="small"
            variant="outlined"
            color="error"
          />
        )}
        {/* TODO: Add types */}
        {proof?.status === 'revoked' && (
          <Chip
            label={protocol.pda.revoked}
            size="small"
            variant="outlined"
            color="warning"
          />
        )}
      </CardCell>
    </Stack>
  );
}
