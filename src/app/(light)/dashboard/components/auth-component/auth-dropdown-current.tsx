'use client';
import { useSession } from 'next-auth/react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import useOrganization from '@/hooks/use-organization';

import { Chip, MenuItem, Stack, Typography, alpha } from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function AuthDropdownCurrent({ onClose }: Props) {
  const { isOrg, organization, pathnameOrg } = useOrganization();
  const { data: session } = useSession();

  const profileImage = isOrg ? organization?.image : undefined;
  const username = organization?.gatewayId ?? session?.user?.username;
  const hasName = !!organization?.name;
  let name = `@${session?.user?.username}`;

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
              size="small"
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
      </Stack>
    </MenuItem>
  );
}
