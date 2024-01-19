import Link from 'next/link';

import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';

import { Box, Button, Stack, Typography } from '@mui/material';

import GatewayBrokenIcon from '../icons/gateway-broken';

type Props = {
  title?: string;
  message?: string;
  href?: string;
  hrefMessage?: string;
  hasLink?: boolean;
  isModal?: boolean;
};

export default function DefaultError({
  title = errorMessages.SOMETHING_WENT_WRONG,
  message = errorMessages.PAGE_NOT_FOUND,
  href = '/',
  hrefMessage = common.actions.back_to_home,
  hasLink = true,
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
          <Typography variant={isModal ? 'h4' : 'h3'}>{title}</Typography>
          <Typography variant="body1">{message}</Typography>
        </Box>
        {!isModal && hasLink && (
          <Link passHref href={href}>
            <Button size="large" variant="contained">
              {hrefMessage}
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
}
