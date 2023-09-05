import Link from 'next/link';

import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';

import { Box, Button, Stack, Typography } from '@mui/material';

import GatewayBrokenIcon from '../icons/gateway-broken';

type Props = {
  href?: string;
  message?: string;
  isModal?: boolean;
};

export default function DefaultError({
  href = '/',
  message = errorMessages.PAGE_NOT_FOUND,
  isModal = false,
}: Props): JSX.Element {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack gap={4}>
        <GatewayBrokenIcon
          sx={{
            width: isModal ? 100 : 160,
            height: 'auto',
          }}
        />
        <Box>
          <Typography variant={isModal ? 'h4' : 'h3'}>
            {errorMessages.SOMETHING_WENT_WRONG}
          </Typography>
          <Typography variant="body1">{message}</Typography>
        </Box>
        {!isModal && (
          <Link passHref href={href}>
            <Button size="large" variant="contained">
              {common.actions.back_to_home}
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
}
