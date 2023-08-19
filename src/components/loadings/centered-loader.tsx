import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from '@mui/material';

type Props = BoxProps & {
  progressProps?: CircularProgressProps;
};

export function CenteredLoader({ progressProps, ...props }: Props) {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress {...progressProps} />
    </Box>
  );
}
