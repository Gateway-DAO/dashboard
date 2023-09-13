import { pdas as pdasLocales } from '@/locale/en/pda';
import { getApiPrivate } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import IssuedPDAsList from './components/list';

export default async function DataAssetsPage() {
  const apiPrivate = await getApiPrivate();
  const pdas = (await apiPrivate.issued_pdas({ take: 6, skip: 0 }))?.issuedPDAs;

  return (
    <>
      {pdas && pdas.length > 0 && <IssuedPDAsList pdas={pdas} />}
      {pdas && pdas.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {pdasLocales.empty}
        </Typography>
      )}
    </>
  );
}
