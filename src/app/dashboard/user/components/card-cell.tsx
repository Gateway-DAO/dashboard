import { ReactNode } from 'react';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
};

export default function CardCell({ label, children }: Props) {
  return (
    <Stack
      gap={1}
      sx={{
        p: 2,
        width: '100%',
        fontSize: 12,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <Typography fontSize={14}>{label}</Typography>
      <Box sx={{ display: 'inline-flex' }}>{children}</Box>
    </Stack>
  );
}
