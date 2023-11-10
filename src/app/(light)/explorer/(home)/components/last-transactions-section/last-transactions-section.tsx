import { transaction } from '@/locale/en/transaction';

import { Box, Container, Stack, Typography } from '@mui/material';

import NumberCard from '../../../components/number-card/number-card';
import LastTransactionsTable from '../last-transactions-table/last-transactions-table';

export default function LastTransactionsSection() {
  return (
    <Box
      sx={{
        pt: 6,
        pb: 6,
        bgcolor: 'primary.light',
      }}
    >
      <Stack component={Container} maxWidth="xl">
        <Typography variant="h5">{transaction.last_transactions}</Typography>
        <Stack
          sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
          gap={2}
          mt={4}
        >
          <NumberCard dark label={transaction.cards.pdas} value={10403405} />
          <NumberCard dark label={transaction.cards.issuers} value={432} />
          <NumberCard
            dark
            label={transaction.cards.data_requests}
            value={564652}
          />
          <NumberCard dark label={transaction.cards.fees} value="$102,045.45" />
        </Stack>
        <LastTransactionsTable />
      </Stack>
    </Box>
  );
}
