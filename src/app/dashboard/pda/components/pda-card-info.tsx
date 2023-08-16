import CopyPaste from '@/components/copy-paste/copy-paste';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import { Stack, Divider, Chip } from '@mui/material';

import { protocol } from '../../../../../locale/en/protocol';
import CardCell from './card-cell';
type Props = {
  pda: any; // TODO: Add type
};

export default function PdaCardInfo({ pda }: Props) {
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
        {dayjs(pda?.issuance_date).format('MM/DD/YYYY, h:mm A')}
      </CardCell>

      {/* TODO: Add dynamic information */}
      <CardCell label={protocol.data_model.pdas_table.status}>
        {/* TODO: Add types */}
        {pda?.status === 'valid' && (
          <Chip
            label={protocol.pda.up_to_date}
            size="small"
            variant="filled"
            color="success"
          />
        )}
        {/* TODO: Add types */}
        {pda?.status === 'invalid' && (
          <Chip
            label={protocol.data_model.pdas_table.status}
            size="small"
            variant="outlined"
            color="error"
          />
        )}
        {/* TODO: Add types */}
        {pda?.status === 'revoked' && (
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
