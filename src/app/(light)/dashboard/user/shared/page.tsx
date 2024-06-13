'use client';

import TitleLayout from '@/components/title-layout/title-layout';
import { shared } from '@/locale/en/shared';

import { Box } from '@mui/system';

import SharedList from './components/shared-list/shared-list';

export default function SharedPage() {
  return (
    <>
      <TitleLayout title={shared.title} titleId="title-assets" />

      <Box sx={{ pt: 5 }}>
        <SharedList />
      </Box>
    </>
  );
}
