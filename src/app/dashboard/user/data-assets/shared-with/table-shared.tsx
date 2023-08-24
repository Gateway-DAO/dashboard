import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import {
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Avatar,
} from '@mui/material';

export function TableSharedDataAssets() {
  const rows = [
    {
      name: 'Chase',
      shared_date: '07/09/23, 12:22am',
      data_amount: 6,
    },
    {
      name: 'Ticketmaster',
      shared_date: '07/09/23, 12:22am',
      data_amount: 6,
    },
    {
      name: 'Ticketmaster',
      shared_date: '07/09/23, 12:22am',
      data_amount: 6,
    },
  ];
  return (
    <Stack py={3}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr 1fr',
              '& th:first-child': {
                pl: CONTAINER_PX,
              },
              '& th:last-child': {
                pr: CONTAINER_PX,
              },
            }}
          >
            <TableCell sx={{ border: 'none' }} variant="head" size="medium">
              Verifier
            </TableCell>
            <TableCell sx={{ border: 'none' }} variant="head">
              Share date
            </TableCell>
            <TableCell sx={{ border: 'none' }} variant="head">
              Data amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              sx={{
                '&:last-child td, ˆ:last-child th': { border: 0 },
                '& td:first-child': {
                  pl: CONTAINER_PX,
                },
                '& td:last-child': {
                  pr: CONTAINER_PX,
                },
                display: 'grid',
                gridTemplateColumns: '3fr 1fr 1fr',
                mx: NEGATIVE_CONTAINER_PX,
              }}
              key={row.name}
            >
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar />
                <Typography variant="subtitle1">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{row.shared_date}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.data_amount}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
    // <Stack>
    //   {/* TABLE HEADERS */}
    //   <Stack
    //     sx={{
    //       display: 'grid',
    //       gridTemplateColumns: '3fr 2fr 1fr',
    //       px: { xs: 0, md: 1, lg: 1 },
    //     }}
    //   >
    //     <TableHeader>Verifier</TableHeader>
    //     <TableHeader>Share Date</TableHeader>
    //     <TableHeader>Data Amount</TableHeader>
    //   </Stack>
    // </Stack>
  );
}
