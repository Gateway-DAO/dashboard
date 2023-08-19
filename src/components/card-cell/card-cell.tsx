import { ReactNode } from 'react';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  alignRight?: boolean;
};

export default function CardCell({
  label,
  children,
  alignRight = false,
}: Props) {
  return (
    <Stack
      gap={1}
      sx={{
        p: 2,
        width: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        textAlign: alignRight ? 'right' : 'left',
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
