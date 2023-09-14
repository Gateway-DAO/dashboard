'use client';
import { useRouter } from 'next/navigation';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { Proof } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { TableCell, TableRow, Typography } from '@mui/material';

import { TableSharedDataProofsContainer } from './table-shared-container';

type Props = {
  proofs: PartialDeep<Proof>[];
};

export function TableSharedDataProofs({ proofs }: Props) {
  const router = useRouter();

  return (
    <TableSharedDataProofsContainer>
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
            <GTWAvatar name={proof?.owner?.user?.gatewayId ?? ""} />
            <Typography variant="subtitle1">
              {proof?.owner?.user?.gatewayId}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              {dayjs(proof?.createdAt).format(DATE_FORMAT)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">
              {proof?.data?.PDAs?.length}
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableSharedDataProofsContainer>
  );
}