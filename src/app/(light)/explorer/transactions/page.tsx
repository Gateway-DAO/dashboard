import { Metadata } from 'next';

import { Box, Container, Stack, Typography } from '@mui/material';

import TransactionsNumbers from './components/transactions-numbers';
import TransactionsTableSection from './components/transactions-table-section';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Gateway Transactions`,
    description: `Discover user activities at a glance on our transaction page – from issuances and requests to verifications. Stay informed with real-time insights from Gateway Network.`,
  };
}

export default function TransactionPage() {
  return (
    <>
      <Box
        sx={{
          pt: 21,
          pb: 6,
          bgcolor: 'primary.light',
        }}
      >
        <Stack
          component={Container}
          maxWidth="xl"
          justifyContent="space-between"
        >
          <Typography variant="h2">Transactions</Typography>
          <TransactionsNumbers />
        </Stack>
      </Box>
      <TransactionsTableSection />
    </>
  );
}
