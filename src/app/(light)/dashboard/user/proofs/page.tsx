import { getReceivedProofs } from '@/app/actions/get-receivedProofs';

import { Stack } from '@mui/material';

import { TableSharedDataAssets } from './components/table-shared';

export default async function DashboardUserProofsPage() {
  const proofs = await getReceivedProofs(0, 6);

  return (
    <Stack>
      <TableSharedDataAssets proofs={proofs} />
    </Stack>
  );
}
