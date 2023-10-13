import { Metadata } from 'next';

import { proofs as proofsLocales } from '@/locale/en/proof';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Typography } from '@mui/material';

import ProofsReceivedTable from './components/proofs-received-table';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Received Data Proofs - Gateway Network',
  };
}

export default async function DashboardUserReceivedProofs() {
  const privateApi = await getPrivateApi();

  const proofs = (await privateApi.received_proofs({ take: 5, skip: 0 }))
    ?.receivedProofs as PartialDeep<Proof>[];
  const count = (await privateApi.countReceivedProofs()).receivedProofsCount;

  return (
    <>
      {proofs && proofs.length > 0 && (
        <ProofsReceivedTable data={proofs} count={count} />
      )}
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
