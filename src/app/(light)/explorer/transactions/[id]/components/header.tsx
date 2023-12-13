import routes from '@/constants/routes';

import { Container, Typography } from '@mui/material';

import ExplorerBreadcrumb from '../../../components/breadcrumb/breadcrumb';
import ExplorerHeader from '../../../components/header/header';

export default function TransactionHeader() {
  return (
    <ExplorerHeader sx={{ pb: 5 }}>
      <Container>
        <ExplorerBreadcrumb
          paths={[
            {
              route: routes.explorer.transactions,
              label: 'Transactions',
            },
            {
              label: 'Transaction Details',
            },
          ]}
        />
        <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
          Transaction Details
        </Typography>
      </Container>
    </ExplorerHeader>
  );
}
