'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
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
  const { isOrg, organization, pathnameOrg } = useOrganization();
  const { data: session } = useSession();

  const profileImage = isOrg
    ? organization?.image
    : session?.user?.profilePicture;
  const username = organization?.gatewayId ?? session?.user?.gatewayId;
  const hasName = !!session?.user?.displayName || !!organization?.name;
  let name = session?.user?.displayName ?? `@${session?.user?.gatewayId}`;

  if (isOrg) {
    name = organization?.name ?? `@${organization?.gatewayId}`;
  }

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
          name={organization?.id ?? session?.user?.id}
          src={profileImage}
          alt={name}
          size={64}
        />
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
          {isOrg && (
            <Chip
              label="ORG"
              sx={(theme) => ({
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  theme.palette.action.focusOpacity
                ),
                color: 'primary.main',
              })}
            />
          )}
        </Stack>
        <Button
          component={Link}
          onClick={onClose}
          href={
            isOrg
              ? routes.dashboardOrgSettings(pathnameOrg)
              : routes.dashboardUserSettings
          }
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
