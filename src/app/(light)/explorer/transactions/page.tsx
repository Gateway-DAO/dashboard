import { Box, Container, Stack, Typography } from '@mui/material';

import TransactionsNumbers from './components/transactions-numbers';

export default function Transaction() {
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
    </>
  );
}
