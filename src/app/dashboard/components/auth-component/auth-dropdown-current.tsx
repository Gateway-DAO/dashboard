'use client';
import Link from 'next/link';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import { auth } from '@/locale/en/auth';

import {
  Button,
  Chip,
  MenuItem,
  Stack,
  Typography,
  alpha,
} from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function AuthDropdownCurrent({ onClose }: Props) {
  const profileImage = '';
  const username = '';
  const hasName = true;
  const did = '';
  const name = '';

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
        <GTWAvatar name={did} src={profileImage} alt={name} size={64} />
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Typography component="span" variant="subtitle1" lineHeight={1}>
              {name}
            </Typography>
            {hasName && (
              <Typography component="span" variant="caption">
                @{username}
              </Typography>
            )}
          </Stack>
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
