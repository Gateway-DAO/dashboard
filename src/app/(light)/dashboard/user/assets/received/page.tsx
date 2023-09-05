import { getMyPdas } from '@/app/actions/get-myPdas';
import { pdas as pdasLocales } from '@/locale/en/pda';

import { Typography } from '@mui/material';

import InfiniteLoadMore from '../components/infinite-load-more';
import PDAsList from '../components/pdas-list';

export default async function DataAssetsPage() {
  const pdas = await getMyPdas(0, 6);

  return (
    <>
      <PDAsList pdas={pdas ?? []} />
      {pdas && pdas.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {pdasLocales.empty}
        </Typography>
      )}
      {pdas && pdas?.length > 0 && <InfiniteLoadMore />}
    </>
  );
}
