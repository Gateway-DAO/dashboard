'use client';
import { PropsWithChildren } from 'react';

import {
  CONTAINER_PB,
  CONTAINER_PT,
  NEGATIVE_CONTAINER_PT,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Stack } from '@mui/material';

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <Stack
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      mr={NEGATIVE_CONTAINER_PX}
      alignItems="stretch"
      minHeight="100%"
      sx={(theme) => ({
        mt: {
          xs: 0,
          lg: NEGATIVE_CONTAINER_PT.lg,
        },
        mr: {
          xs: 0,
          lg: NEGATIVE_CONTAINER_PX.lg,
        },
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
