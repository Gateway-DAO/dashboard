import { Metadata } from 'next';

import { pdas as pdasLocales } from '@/locale/en/pda';
import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import HelpCards from './components/help-cards';
import IssuedPDAsList from './components/list';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Issued Data Assets - Gateway Network',
  };
}

export default async function DataAssetsPage() {
  const privateApi = await getPrivateApi();
  const pdas = (await privateApi.issued_pdas({ take: 6, skip: 0 }))?.issuedPDAs;

  return (
    <>
      {pdas && pdas.length > 0 && <IssuedPDAsList pdas={pdas} />}
      {pdas && pdas.length === 0 && (
        <>
          <HelpCards />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', width: '100%' }}
          >
            {pdasLocales.empty}
          </Typography>
        </>
      )}
    </>
  );
}
