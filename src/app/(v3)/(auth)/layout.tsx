import { PropsWithChildren } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box, Stack } from '@mui/material';

import { style } from './style';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      {style}
      <Stack
        direction="row"
        sx={{
          px: CONTAINER_PX,
          pt: {
            xs: 3,
            md: 4,
          },
          gap: 116 / 8,
          minHeight: '100%',
          maxWidth: 1920,
          mx: 'auto',
        }}
      >
        <Stack
          direction="column"
          gap={2}
          sx={{
            flex: 1,
            mb: {
              xs: 0,
              md: 4,
            },
            alignSelf: 'flex-start',
            maxWidth: 610,
          }}
        >
          {children}
        </Stack>
        <Box
          sx={{
            flex: 1,
            background: 'url(/images/auth-bg.svg)',
            backgroundSize: '100% auto',
            backgroundRepeat: 'repeat-y',
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        />
      </Stack>
    </>
  );
}
