import { PropsWithChildren } from 'react';

import { Divider, List, ListProps, Stack } from '@mui/material';

type Props = ListProps;

export default function WhiteList({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Stack
      component={List}
      divider={<Divider />}
      direction="column"
      {...props}
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderRadius: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        p: 0,
        ...props?.sx,
      }}
    >
      {children}
    </Stack>
  );
}
