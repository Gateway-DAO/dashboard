import { ReactNode } from 'react';

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
        pt: 2,
        flexGrow: {
          md: 0.5,
        },
      }}
    >
      {children}
    </Stack>
  );
}
