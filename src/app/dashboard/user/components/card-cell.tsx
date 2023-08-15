import { ReactNode } from 'react';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
};

export default function CardCell({ label, children }: Props) {
  return (
    <Stack
      sx={{
        p: 2,
        width: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box sx={{ display: 'inline-flex', color: 'text.primary' }}>
        {children}
      </Box>
    </Stack>
  );
}
