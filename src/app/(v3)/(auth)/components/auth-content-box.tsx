import { PropsWithChildren } from 'react';

import { Box, BoxProps } from '@mui/material';

export default function AuthContentBox<C extends React.ElementType>({
  children,
  component,
}: BoxProps<C, { component?: C }>) {
  return (
    <Box
      component={component}
      sx={{
        borderRadius: 1.5,
        backgroundColor: {
          xs: 'unset',
          md: 'white',
        },
        p: {
          md: 3,
        },
      }}
    >
      {children}
    </Box>
  );
}
