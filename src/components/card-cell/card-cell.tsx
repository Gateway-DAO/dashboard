import { ReactNode } from 'react';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  alignRight?: boolean;
  margin?: boolean;
};

export default function CardCell({
  label,
  children,
  alignRight = false,
  margin = true,
}: Props) {
  return (
    <Stack
      gap={margin ? 1 : 0}
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
      <Box sx={{ color: 'text.primary', whiteSpace: 'pre' }}>{children}</Box>
    </Stack>
  );
}
