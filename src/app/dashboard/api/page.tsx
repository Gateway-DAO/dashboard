import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';

import { Stack } from '@mui/material';

import AuthenticationTokenSection from './components/authentication-token';

export const metadata: Metadata = {
  title: 'API - Gateway',
};

export default async function DeveloperAccessPage() {
  return (
    <>
      <TitleLayout
        titleId="api-details"
        title="API"
        subtitle="Here's all the info needed to connect to our API."
      />
      <Stack
        gap={2}
        alignItems="flex-start"
        sx={{
          maxWidth: {
            lg: 900,
          },
        }}
      >
        <AuthenticationTokenSection />
      </Stack>
    </>
  );
}
