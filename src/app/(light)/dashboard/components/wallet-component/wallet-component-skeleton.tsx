import { Box, Skeleton, alpha } from '@mui/material';

export default function WalletComponentSkeleton() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: {
          xs: 'transparent',
          lg: alpha(
            theme.palette.primary.main,
            theme.palette.action.focusOpacity
          ),
        },
        borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
        p: 2,
        mr: {
          xs: -2,
          lg: 0,
        },
        mb: 2,
        textAlign: 'left',
        alignItems: 'center',
      })}
    >
      <Skeleton variant="text" sx={{ width: 90, height: 12, mb: 0.5 }} />
      <Skeleton variant="text" sx={{ width: 50, height: 24, mb: 2 }} />
      <Skeleton variant="rounded" sx={{ width: '100%', height: 30 }} />
    </Box>
  );
}
