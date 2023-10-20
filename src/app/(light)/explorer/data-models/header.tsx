import Link from 'next/link';

import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';

import InfoCard from '../components/info-card/info-card';

export default function DataModelsExplorerHeader() {
  return (
    <Stack
      component={Container}
      maxWidth="xl"
      justifyContent="space-between"
      direction="row"
      gap={2}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 'calc(50% - 16px)',
            lg: '50%',
          },
        }}
      >
        <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
          Data models
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Data models serve as foundational templates for Private Data Assets
          (PDAs). Each PDA created using a data model adheres to a standardized
          structure of claims, making these frameworks exceptionally reusable
          for various related scenarios.
        </Typography>
        <MuiLink component={Link} href="/" fontWeight="700" underline="hover">
          How to use data models
        </MuiLink>
      </Box>
      <InfoCard
        sx={{
          width: {
            md: 'calc(50% - 16px)',
            lg: 'calc(25% - 16px)',
          },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      />
    </Stack>
  );
}
