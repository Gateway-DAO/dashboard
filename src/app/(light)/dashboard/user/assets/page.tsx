'use client';

import TitleLayout from '@/components/title-layout/title-layout';
import { pdas as pdasLocales } from '@/locale/en/pda';

import { Box } from '@mui/system';

import PDAsList from './components/pdas-list/pdas-list';
import FilePicker from '@/components/form/file-picker/file-picker';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function AssetsPage() {
  const session = useSession();
  const [error, setError] = useState({ title: '', description: '' });
  const [onFileUpload, setOnFileUpload] = useState<Blob[]>();

  return (
    <>
      <TitleLayout title={pdasLocales.my_data_assets} titleId="title-assets">
        <FilePicker
          currentUserStorage={1000}
          onError={setError}
          onFileUpload={setOnFileUpload}
        />
      </TitleLayout>
      {error.title.length > 0 && <p>{error.title}</p>}
      <Box sx={{ pt: 5 }}>
        <PDAsList />
      </Box>
    </>
  );
}
