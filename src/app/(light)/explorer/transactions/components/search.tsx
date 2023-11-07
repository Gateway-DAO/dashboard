'use client';

import dayjs from 'dayjs';

import { RefreshOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import SearchField from '../../components/search-filters/search-field';

type Props = {
  totalTransactions?: number;
};

export default function Search({ totalTransactions }: Props) {
  return (
    <Stack borderBottom="1px solid" borderColor="divider" pb={3}>
      <SearchField onChange={(value: string) => console.log(value)} />
      {totalTransactions && (
        <Box
          display="flex"
          mt={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              {totalTransactions.toLocaleString()} transactions found at{' '}
              {dayjs().format('DD/MM/YYYY, hh:mm a')}
            </Typography>
            <Typography variant="caption">
              Showing the last 20 records
            </Typography>
          </Box>
          <Box component={Button} onClick={() => console.log('refresh list')}>
            <RefreshOutlined />
            Refresh list
          </Box>
        </Box>
      )}
    </Stack>
  );
}
