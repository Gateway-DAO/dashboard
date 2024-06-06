import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle?: string;
  titleId: string;
  children?: ReactNode;
};

export default function TitleLayout({
  title,
  subtitle,
  titleId,
  children,
}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mb: {
          xs: 4,
          md: 5,
          lg: 6,
        },
      }}
    >
      <Stack>
        <Typography
          variant="h3"
          id={titleId}
          sx={{ mb: 1, textTransform: 'capitalize' }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      </Stack>
      <Stack>{children && children}</Stack>
    </Stack>
  );
}
