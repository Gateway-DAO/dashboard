import { PropsWithChildren, ReactNode } from 'react';

import { Box, Stack, StackProps, Typography } from '@mui/material';

type Props = {
  label: string;
  children: ReactNode;
  alignRight?: boolean;
  margin?: boolean;
  px?: number;
  py?: number;
  pre?: boolean;
  disabled?: boolean;
};

export function CardCellContainer({
  children,
  alignRight = false,
  margin = true,
  py = 2,
  px = 2,
  ...props
}: PropsWithChildren<
  Omit<StackProps, 'margin'> &
    Pick<Props, 'margin' | 'px' | 'py' | 'alignRight'>
>) {
  return (
    <Stack
      gap={margin ? 1 : 0}
      {...props}
      sx={{
        px,
        py,
        width: '100%',
        textAlign: { xs: 'left', md: alignRight ? 'right' : 'left' },
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...props.sx,
      }}
    >
      {children}
    </Stack>
  );
}

export default function CardCell({
  label,
  children,
  alignRight,
  margin,
  py,
  px,
  disabled = false,
  pre = true,
}: Props) {
  return (
    <CardCellContainer alignRight={alignRight} margin={margin} py={py} px={px}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box
        sx={{
          whiteSpace: pre ? 'pre' : undefined,
          color: disabled ? 'text.disabled' : 'text.primary',
        }}
      >
        {children}
      </Box>
    </CardCellContainer>
  );
}
