import { proofs as proofsLocales } from '@/locale/en/proof';
import { getApiPrivate } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Typography } from '@mui/material';

import { TableSharedDataProofs } from '../components/table-shared';


export default async function ProofsPage() {
  const apiPrivate = await getApiPrivate();

  const proofs = (await apiPrivate.received_proofs({ take: 6, skip: 0 }))
    ?.receivedProofs as PartialDeep<Proof>[];

  return (
    <>
      {proofs && proofs.length > 0 && <TableSharedDataProofs proofs={proofs} />}
      {proofs && proofs.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {proofsLocales.empty}
        </Typography>
      )}
    </>
  );
}
