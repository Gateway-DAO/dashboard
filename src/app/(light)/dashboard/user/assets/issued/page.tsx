import { Metadata } from 'next';

import InstructionGuideHowToIssue from '@/app/(light)/dashboard/components/cards/instruction-guide-how-to-issue';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { getPrivateApi } from '@/services/protocol/api';

import { Box, Typography } from '@mui/material';

import PdasHeader from '../components/pdas-header';
import IssuePdaAction from './components/issue-pda-action';
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
      <PdasHeader>
        <IssuePdaAction />
      </PdasHeader>
      <Box sx={{ pt: 5 }}>
        <InstructionGuideHowToIssue />
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
      </Box>
    </>
  );
}
