import { ReactNode } from 'react';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  alignRight?: boolean;
  margin?: boolean;
  px?: number;
  py?: number;
  disabled?: boolean;
};

export default function CardCell({
  label,
  children,
  alignRight = false,
  margin = true,
  py = 2,
  px = 2,
  disabled = false,
}: Props) {
  return (
    <Stack
      gap={margin ? 1 : 0}
      sx={{
        px,
        py,
        width: '100%',
        textAlign: { xs: 'left', md: alignRight ? 'right' : 'left' },
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box
        sx={{
          whiteSpace: 'pre',
          color: disabled ? 'text.disabled' : 'text.primary',
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
