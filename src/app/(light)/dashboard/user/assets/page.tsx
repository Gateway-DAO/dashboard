'use client';

import TitleLayout from '@/components/title-layout/title-layout';
import { pdas as pdasLocales } from '@/locale/en/pda';

import { Box } from '@mui/system';

import PDAsList from './components/pdas-list/pdas-list';
import FilePicker from '@/components/form/file-picker/file-picker';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToggle } from '@react-hookz/web';
import UploadModal from './components/upload-modal/upload-modal';

export default function AssetsPage() {
  const session = useSession();
  const [isOpen, toggle] = useToggle();
  const [error, setError] = useState({ title: '', description: '' });
  const [onFileUpload, setOnFileUpload] = useState<Blob[]>([]);

  return (
    <>
      <TitleLayout title={pdasLocales.my_data_assets} titleId="title-assets">
        <FilePicker
          currentUserStorage={1000}
          onError={setError}
          onFileUpload={setOnFileUpload}
          toggle={toggle}
        />
      </TitleLayout>
      <UploadModal
        isOpen={isOpen}
        toggle={toggle}
        files={onFileUpload}
        error={error}
        onFileUpload={setOnFileUpload}
      />
      <Box sx={{ pt: 5 }}>
        <PDAsList />
      </Box>
    </>
  );
}
