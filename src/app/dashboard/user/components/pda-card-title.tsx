'use client';
import { AvatarFile } from '@/components/avatar-file/avatar-file';
import { theme } from '@/theme';

import { Stack, Divider, Typography, alpha } from '@mui/material';

type Props = {
  credential?: any; // TODO: Add type
};

export default function PdaCardTitle({ credential }: Props) {
  return (
    <Stack
      sx={{
        borderRadius: 1,
        mb: 3,
        p: 2,
        overflow: 'hidden',
        boxShadow: 'none',
        backgroundColor: alpha(theme.palette.secondary.main, 0.4),
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <Stack direction="row">
        <Stack gap={1}>
          <Typography variant="caption" color="text.secondary">
            Data shared with
          </Typography>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <AvatarFile file={null} />
            <Typography variant="h3">Chase</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
