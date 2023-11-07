import { Box, Container, Stack, Typography } from '@mui/material';

import TransactionsNumbers from './components/transactions-numbers';
import TransactionsTableSection from './components/transactions-table-section';

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
