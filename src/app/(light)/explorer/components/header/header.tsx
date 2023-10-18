import { Box, BoxProps } from '@mui/material';

export default function ExplorerHeader({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        pt: 16,
        pb: 6,
        ...sx,
      }}
    />
  );
}
