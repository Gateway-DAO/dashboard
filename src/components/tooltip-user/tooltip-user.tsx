import Link from 'next/link';
import { MutableRefObject, useEffect, useRef } from 'react';

import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { Paper, Stack, Typography } from '@mui/material';

import GTWAvatar from '../gtw-avatar/gtw-avatar';

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
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref: MutableRefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef as any);

  return (
    <Paper
      component={Stack}
      ref={wrapperRef}
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
        <GTWAvatar src={picture} size={64} name={name!} />
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
      <Typography fontSize={24} id="tooltip-user-name">
        {limitCharsCentered(name as string, 16)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {limitCharsCentered(username as string, 29)}
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
        {/* <Link href="https://www.google.com" passHref target="_blank">
          <LaunchIcon
            sx={{
              color: 'text.primary',
              fontSize: 16,
            }}
          />
        </Link> */}
      </Stack>
    </Paper>
  );
}
