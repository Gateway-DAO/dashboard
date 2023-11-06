import { Stack } from '@mui/material';

import NumberCard from '../../components/number-card/number-card';

export default function TransactionsNumbers() {
  return (
    <Stack direction="row" gap={2} mt={4} overflow="auto">
      <NumberCard dark label="Transactions" value={88043405} />
      <NumberCard label="PDAs issued" value={10403405} />
      <NumberCard label="Unique issuers" value={432} />
      <NumberCard label="Data requests created" value={564652} />
      <NumberCard label="Fees generated for issuers" value="$102,045.45" />
    </Stack>
  );
}
