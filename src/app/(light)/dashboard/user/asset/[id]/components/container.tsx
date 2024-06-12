'use client';
import { PropsWithChildren } from 'react';

import {
  CONTAINER_PB,
  CONTAINER_PT,
  NEGATIVE_CONTAINER_PT,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Stack } from '@mui/material';

export function PageContainer({ children }: PropsWithChildren) {
  return (
    <Stack
      direction="row"
      mr={NEGATIVE_CONTAINER_PX}
      alignItems="stretch"
      minHeight="100%"
      sx={(theme) => ({
        mt: NEGATIVE_CONTAINER_PT,
        height: {
          xs: `calc(100% + ${theme.spacing(
            CONTAINER_PT.xs + CONTAINER_PB.xs
          )})`,
          lg: `calc(100% + ${theme.spacing(
            CONTAINER_PT.lg + CONTAINER_PB.lg
          )})`,
        },
      })}
    >
      {children}
    </Stack>
  );
}
