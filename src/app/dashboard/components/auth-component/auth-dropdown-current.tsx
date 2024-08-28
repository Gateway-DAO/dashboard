'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { auth } from '@/locale/en/auth';

import { Button, MenuItem, Stack, Typography } from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function AuthDropdownCurrent({ onClose }: Props) {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <MenuItem
      disableTouchRipple
      disableRipple
      sx={{
        ':hover': {
          background: 'none',
        },
        cursor: 'default',
      }}
    >
      <Stack direction="column" gap={1} sx={{ width: '100%' }}>
        <GTWAvatar
          name={session?.user.did}
          src=""
          alt={session?.user.username}
          size={64}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography component="span" variant="subtitle1" lineHeight={1}>
            {session?.user.username}
          </Typography>
        </Stack>
        <Button
          component={Link}
          onClick={onClose}
          href={routes.dashboard.user.settings}
          fullWidth
          variant="outlined"
          size="small"
        >
          {auth.menu.gatewayId}
        </Button>
      </Stack>
    </MenuItem>
  );
}
