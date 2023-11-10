import { transaction } from '@/locale/en/transaction';

import { Stack } from '@mui/material';

import NumberCard from '../../components/number-card/number-card';

export default function TransactionsNumbers() {
  return (
    <Stack direction="row" gap={2} mt={4} overflow="auto">
      <NumberCard dark label={transaction.title} value={88043405} />
      <NumberCard label={transaction.cards.pdas} value={10403405} />
      <NumberCard label={transaction.cards.issuers} value={432} />
      <NumberCard label={transaction.cards.data_requests} value={564652} />
      <NumberCard label={transaction.cards.fees} value="$102,045.45" />
    </Stack>
  );
}
