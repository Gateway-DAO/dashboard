import { CardCellContainer } from '@/components/card-cell/card-cell';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { transaction } from '@/locale/en/transaction';
import dayjs from 'dayjs';

import {
  Card,
  Typography,
  Divider,
  Chip,
  Button,
  Stack,
  Box,
} from '@mui/material';

const mock = [
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVa',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVb',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVc',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVd',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVe',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVf',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
  {
    id: 'hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVg',
    type: 'PDA issuance',
    date: '2023-10-10T18:51:29.941Z',
  },
];

export default function LastTransactionsTable() {
  return (
    <Stack
      component={Card}
      sx={{
        mt: 4,
        mb: 3,
        overflow: 'visible',
      }}
      variant="outlined"
    >
      <CardCellContainer mb={1}>
        <Box display="flex">
          <Typography flex={3}>{transaction.home_table.columns.id}</Typography>
          <Typography flex={1}>
            {transaction.home_table.columns.action}
          </Typography>
          <Typography flex={1}>
            {transaction.home_table.columns.date}
          </Typography>
        </Box>
      </CardCellContainer>
      <Stack
        divider={
          <Divider
            sx={{
              width: '100%',
            }}
          />
        }
      >
        {mock.map((transaction) => (
          <CardCellContainer key={transaction.id}>
            <Box display="flex">
              <Typography flex={3}>{transaction.id}</Typography>
              <Box flex={1}>
                <Chip label={transaction.type} />
              </Box>
              <Typography flex={1}>
                {dayjs(transaction.date).format(DATE_FORMAT)}
              </Typography>
            </Box>
          </CardCellContainer>
        ))}
        <CardCellContainer alignItems="flex-start">
          <Button variant="text" href={routes.explorer.transactions}>
            {transaction.home_table.view_more}
          </Button>
        </CardCellContainer>
      </Stack>
    </Stack>
  );
}
