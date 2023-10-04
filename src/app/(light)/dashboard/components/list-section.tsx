import { PropsWithChildren, ReactNode } from 'react';

import WhiteList from '@/components/white-list/white-list';

import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  button?: ReactNode;
};

export default function ListSection({
  title,
  button,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Stack gap={3} sx={{ my: 4, maxWidth: 1094 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">{title}</Typography>
          {button}
        </Stack>
        {children && <WhiteList>{children}</WhiteList>}
      </Stack>
    </>
  );
}
