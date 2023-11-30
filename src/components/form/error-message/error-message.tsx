import { PropsWithChildren } from 'react';

import { Typography, TypographyProps } from '@mui/material';

export default function ErrorMessage({
  children,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <Typography color="error" mt={1} {...props}>
      {children}
    </Typography>
  );
}
