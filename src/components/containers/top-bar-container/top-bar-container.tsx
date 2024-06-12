import { ReactNode } from 'react';

import { CONTAINER_PT } from '@/theme/config/style-tokens';

import { Stack } from '@mui/material';

type Props = {
  children: ReactNode;
};

export default function TopBarContainer({ children }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      sx={{
        display: 'flex',
        flexGrow: {
          md: 0.5,
        },
        pt: CONTAINER_PT,
      }}
    >
      {children}
    </Stack>
  );
}
