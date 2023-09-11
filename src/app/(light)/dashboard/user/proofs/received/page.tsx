import { getReceivedProofs } from '@/app/actions/get-receivedProofs';
import InfiniteLoadMore from '@/components/infinite-load-more/infinite-load-more';
import { proofs as proofsLocales } from '@/locale/en/proof';

import { Typography } from '@mui/material';

import { TableSharedDataAssets } from '../components/table-shared';

export default async function DataAssetsPage() {
  const proofs = await getReceivedProofs(0, 6);

  return (
    <>
      <TableSharedDataAssets proofs={proofs} />
      {proofs && proofs.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {proofsLocales.empty}
        </Typography>
      )}
      {proofs && proofs?.length > 0 && <InfiniteLoadMore />}
    </>
  );
}
