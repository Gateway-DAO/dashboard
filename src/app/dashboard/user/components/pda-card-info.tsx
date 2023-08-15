import CopyPaste from '@/components/copy-paste/copy-paste';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import { Stack, Box, Divider, Chip } from '@mui/material';

import CardCell from './card-cell';
type Props = {
  credential?: any; // TODO: Add type
};

export default function PdaCardInfo({ credential }: Props) {
  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
        maxWidth: 550,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        direction="column"
        divider={
          <Box>
            <Divider />
          </Box>
        }
      >
        {/* TODO: Add dynamic information */}
        <CardCell label="Share date">
          {dayjs('2018-04-04T16:00:00.000Z').format('MM/DD/YYYY, h:mm A')}
        </CardCell>

        {/* TODO: Add dynamic information */}
        <CardCell label="Data Proof ID">
          <CopyPaste
            text={limitCharsCentered(
              '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
              8
            )}
          />
        </CardCell>

        {/* TODO: Add dynamic information */}
        <CardCell label="Status">
          <Chip
            label="Up-to-date"
            size="small"
            variant="outlined"
            color="success"
            sx={{ color: 'success.main' }}
          />
        </CardCell>
      </Stack>
    </Stack>
  );
}
