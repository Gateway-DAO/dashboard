'use client';

import { Typography, Stack } from '@mui/material';

export function IndividualDetailRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        px: {
          xs: 0,
          lg: 4,
        },
        py: 2,
      }}
    >
      {children}
    </Stack>
  );
}

export function RowText({ title }: { title: string }) {
  return (
    <Typography variant="caption" fontWeight={400} fontSize={12}>
      {title}
    </Typography>
  );
}

export function RowSecondaryText({ text }: { text: string }) {
  return (
    <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
      {text}
    </Typography>
  );
}
