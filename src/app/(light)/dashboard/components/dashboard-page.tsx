import { PropsWithChildren } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box, BoxProps } from '@mui/material';

export default function DashboardPage({
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <Box
      {...props}
      width="100%"
      sx={{
        px: CONTAINER_PX,
        pt: {
          xs: 2,
          lg: 5,
        },
        pb: {
          xs: 7,
          lg: 2,
        },
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
