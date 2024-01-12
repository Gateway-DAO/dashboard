'use client';

import PdasHelpCards from '@/app/(light)/dashboard/components/cards/pdas-help-cards';
import { EducationalContext } from '@/components/educational/educational-context';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { Received_PdasQuery } from '@/services/protocol/types';

import { Typography } from '@mui/material';

import ReceivedPDAsList from './list';

type Props = {
  pdas: Received_PdasQuery['myPDAs'];
};

export default function DataAssetsContent({ pdas }: Props) {
  return (
    <EducationalContext.Provider value={{ key: '', value: '' }}>
      <PdasHelpCards />
      {pdas && pdas.length > 0 && <ReceivedPDAsList pdas={pdas} />}
      {pdas && pdas.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {pdasLocales.empty}
        </Typography>
      )}
    </EducationalContext.Provider>
  );
}
