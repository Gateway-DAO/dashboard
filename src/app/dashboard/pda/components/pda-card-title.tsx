'use client';
import { AvatarFile } from '@/components/avatar-file/avatar-file';
import { theme } from '@/theme';

import { Stack, Divider, Typography, alpha } from '@mui/material';

import { protocol } from '../../../../../locale/en/protocol';

type Props = {
  pda: any; // TODO: Add type
};

export default function PdaCardTitle({ pda }: Props) {
  return (
    <Stack
      sx={{
        borderRadius: 1,
        mb: 3,
        p: 2,
        backgroundColor: alpha(theme.palette.secondary.main, 0.4),
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <Stack gap={1}>
        <Typography variant="caption" color="text.secondary">
          {protocol.pda.data_shared_with}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <AvatarFile file={null} />
          <Typography variant="h3">{pda?.title}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
