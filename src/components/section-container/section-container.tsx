import { PropsWithChildren } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Container, Stack } from '@mui/material';
import { ContainerProps } from '@mui/system';

export function SectionContainer({
  children,
  withContainer,
  ...props
}: PropsWithChildren<ContainerProps> & { withContainer: boolean }) {
  return (
    <>
      {withContainer ? (
        <Container
          component={Stack}
          sx={{
            display: 'flex',
            py: 6,
          }}
          {...props}
        >
          {children}
        </Container>
      ) : (
        <Stack sx={{ px: CONTAINER_PX, py: 6 }}>{children}</Stack>
      )}
    </>
  );
}
