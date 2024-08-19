import { Box, Skeleton, alpha } from '@mui/material';

export default function AuthComponentSkeleton() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: {
          xs: 'transparent',
          lg: 'primary.light',
        },
        borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
        p: 2,
        mr: {
          xs: -2,
          lg: 0,
        },
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
      <Skeleton
        sx={{
          width: '50%',
          ml: 2,
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
      />
    </Box>
  );
}
