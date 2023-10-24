import Link from 'next/link';

import { explorerDataModels } from '@/locale/en/datamodel';

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
          {explorerDataModels.title}
        </Typography>
        <Typography color="text.secondary" mb={3}>
          {explorerDataModels.subtitle}
        </Typography>
        <MuiLink component={Link} href="/" fontWeight="700" underline="hover">
          {explorerDataModels.help}
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
