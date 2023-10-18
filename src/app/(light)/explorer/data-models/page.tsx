import Link from 'next/link';

import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';

import ExplorerHeader from '../components/header/header';
import InfoCard from '../components/info-card/info-card';

export default function DataModelsExplorerPage() {
  return (
    <>
      <ExplorerHeader
        sx={{
          backgroundColor: 'primary.light',
        }}
      >
        <Stack
          component={Container}
          maxWidth="xl"
          justifyContent="space-between"
          direction="row"
          gap={2}
        >
          <Box
            sx={{
              flex: {
                xs: 1,
                md: 0.6,
              },
            }}
          >
            <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
              Data models
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Data models serve as foundational templates for Private Data
              Assets (PDAs). Each PDA created using a data model adheres to a
              standardized structure of claims, making these frameworks
              exceptionally reusable for various related scenarios.
            </Typography>
            <MuiLink
              component={Link}
              href="/"
              fontWeight="700"
              underline="hover"
            >
              How to use data models
            </MuiLink>
          </Box>
          <InfoCard
            sx={{
              flex: 0.3,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          />
        </Stack>
      </ExplorerHeader>
    </>
  );
}
