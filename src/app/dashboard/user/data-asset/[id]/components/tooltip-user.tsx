import Link from 'next/link';

import { AvatarFile } from '@/components/avatar-file/avatar-file';
import { PdaQuery } from '@/services/protocol/types';
import dayjs from 'dayjs';

import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { Paper, Stack, Typography } from '@mui/material';

type Props = {
  onClose: () => void;
  right?: boolean;
  picture?: string;
  name?: string;
  username?: string;
  issuance_date?: string;
  isOrganization?: boolean;
};

export function TooltipUser({
  onClose,
  right = false,
  picture,
  name,
  username,
  issuance_date,
  isOrganization,
}: Props) {
  return (
    <Paper
      component={Stack}
      elevation={2}
      sx={{
        position: 'absolute',
        top: 70,
        borderRadius: 1,
        backgroundColor: 'common.white',
        border: '1px solid',
        borderColor: 'divider',
        width: 313,
        p: 2,
        right: right ? 0 : 'inherit',
        zIndex: 1,
      }}
    >
      <Stack
        justifyContent="space-between"
        direction="row"
        gap={1}
        sx={{ mb: 2 }}
      >
        <AvatarFile
          file={picture}
          fallback={'/avatar.png'}
          sxProps={{ width: 64, height: 64 }}
        >
          {name}
        </AvatarFile>
        <CloseIcon
          sx={{
            cursor: 'pointer',
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'action.hover',
            p: 1,
          }}
          onClick={onClose}
        />
      </Stack>
      <Typography fontSize={24}>{name}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {username}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography>
            {isOrganization ? 'Organization ID' : 'User ID'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Joined in {dayjs(issuance_date).format('MM/DD/YYYY, h:mm A')}
          </Typography>
        </Stack>
        <Link href="https://www.google.com" passHref>
          <LaunchIcon
            sx={{
              color: 'text.primary',
              fontSize: 16,
            }}
          />
        </Link>
      </Stack>
    </Paper>
  );
}
