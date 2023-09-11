'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Loading from '@/components/loadings/loading';
import routes from '@/constants/routes';
import { proofs as proofsLocale } from '@/locale/en/proof';
import { ReceivedProofsQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import dayjs from 'dayjs';

import {
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
} from '@mui/material';

type Props = {
  proofs: ReceivedProofsQuery['receivedProofs'] | null;
};

export function TableSharedDataAssets({ proofs }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
        <TableBody>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {proofs?.map((proof) => (
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
                    cursor: 'pointer',
                  }}
                  hover={true}
                  key={proof?.id}
                  onClick={() => {
                    setIsLoading(true);
                    router.push(routes.dashboardUserProof(proof?.id));
                  }}
                >
                  <TableCell
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <GTWAvatar name={proof?.organization?.image ?? ''} />
                    <Typography variant="subtitle1">
                      {proof?.organization?.gatewayId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {dayjs(proof?.createdAt).format('MM/DD/YYYY, h:mm A')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {proof?.data?.PDAs?.length}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
}
