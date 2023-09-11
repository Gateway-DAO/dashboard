'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Loading from '@/components/loadings/loading';
import routes from '@/constants/routes';
import { ReceivedProofsQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import dayjs from 'dayjs';

import { TableCell, TableRow, Typography } from '@mui/material';

import { TableSharedDataProofsContainer } from './table-shared-container';

type Props = {
  proofs: ReceivedProofsQuery['receivedProofs'] | null;
};

export function TableSharedDataProofs({ proofs }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <TableSharedDataProofsContainer>
      {isLoading ? (
        <Loading size={16} />
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
    </TableSharedDataProofsContainer>
  );
}
