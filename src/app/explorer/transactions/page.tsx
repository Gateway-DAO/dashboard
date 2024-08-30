import { Metadata } from 'next';

import { Box, Container, Stack, Typography } from '@mui/material';

import TransactionsNumbers from './components/transactions-numbers';
import TransactionsTableSection from './components/transactions-table-section';
import InternalHeader from '@/components/internal/internal-header';

export const metadata: Metadata = {
  title: `Gateway Transactions`,
  description: `Discover user activities at a glance on our transaction page - from issuances and requests to verifications. Stay informed with real-time insights from Gateway Network.`,
};

export default function TransactionPage() {
  return (
    <>
      <InternalHeader
        color="primary"
        slot={<Typography variant="h2">Transactions</Typography>}
      ></InternalHeader>
      <Box
        sx={{
          pb: 6,
          bgcolor: 'primary.100',
        }}
      >
        <Stack
          component={Container}
          maxWidth="xl"
          justifyContent="space-between"
        >
          <TransactionsNumbers />
        </Stack>
      </Box>
      <TransactionsTableSection />
    </>
  );
}
