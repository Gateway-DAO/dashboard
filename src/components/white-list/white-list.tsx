import { PropsWithChildren } from 'react';

import { Divider, List, Stack } from '@mui/material';

export default function WhiteList({ children }: PropsWithChildren) {
  return (
    <Stack
      component={List}
      divider={<Divider />}
      direction="column"
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderRadius: 1,
        borderWidth: 1,
        borderStyle: 'solid',
      }}
    >
      {children}
    </Stack>
  );
}
