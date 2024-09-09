import { PropsWithChildren, ReactNode } from 'react';

import { Box, BoxProps, Stack, StackProps, Typography } from '@mui/material';

// TODO: Check usage

type Props = {
  label: string;
  children: ReactNode;
  alignRight?: boolean;
  margin?: boolean; //TODO: Verify if makes sense
  px?: number;
  py?: number;
  pre?: boolean;
  disabled?: boolean;
  contentProps?: BoxProps;
} & Omit<StackProps, 'margin'>;

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
  sx,
  contentProps,
}: Props) {
  return (
    <CardCellContainer
      alignRight={alignRight}
      margin={margin}
      py={py}
      px={px}
      sx={sx}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box
        {...contentProps}
        sx={{
          whiteSpace: pre ? 'pre' : undefined,
          color: disabled ? 'text.disabled' : 'text.primary',
          ...contentProps?.sx,
        }}
      >
        {children}
      </Box>
    </CardCellContainer>
  );
}
