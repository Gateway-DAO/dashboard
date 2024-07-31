import { Box, Container, Stack, Typography } from '@mui/material';

import AnimatedList from './animated-list';

export default function UnlockGateway() {
  return (
    <Stack
      component={Container}
      flexDirection={{
        xs: 'column',
        lg: 'row',
      }}
      sx={{
        pt: {
          xs: 6,
          md: 17.5,
        },
        pb: {
          xs: 6,
          md: 15,
        },
        color: 'white.main',
      }}
      gap={3}
    >
      <Box
        sx={{
          width: {
            lg: 316,
          },
          flexShrink: {
            lg: 0,
          },
        }}
      >
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{
            color: 'primary.200',
          }}
          fontWeight="lighter"
        >
          Unlock the gateway to
        </Typography>
      </Box>
      <Box>
        <AnimatedList />
      </Box>
    </Stack>
  );
}
