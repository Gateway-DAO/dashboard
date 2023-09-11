import { ReactNode } from 'react';

import { proofs as proofsLocale } from '@/locale/en/proof';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

type Props = {
  children: ReactNode;
};

export function TableSharedDataProofsContainer({ children }: Props) {
  return (
    <Stack py={3}>
      <Table
        sx={{
          minWidth: {
            xs: 0,
            lg: 650,
          },
          width: {
            xs: '100%',
          },
          overflowX: {
            xs: 'scroll',
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              display: 'grid',
              '& th:first-child': {
                pl: CONTAINER_PX,
              },
              '& th:last-child': {
                pr: CONTAINER_PX,
              },
              gridTemplateColumns: '3fr 1fr 1fr',
              mx: NEGATIVE_CONTAINER_PX,
            }}
          >
            <TableCell sx={{ border: 'none' }} variant="head" size="medium">
              {proofsLocale.verifier}
            </TableCell>
            <TableCell sx={{ border: 'none' }} variant="head">
              {proofsLocale.share_date}
            </TableCell>
            <TableCell sx={{ border: 'none' }} variant="head">
              {proofsLocale.data_amount}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </Stack>
  );
}
