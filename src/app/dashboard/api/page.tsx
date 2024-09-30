import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { getServerComponentSession } from '@/services/next-auth/config';

import { Stack } from '@mui/material';

import AuthenticationTokenSection from './components/authentication-token';
import DID from './components/did';

export const metadata: Metadata = {
  title: 'API',
};

export default async function DeveloperAccessPage() {
  const session = await getServerComponentSession();
  if (!session) {
    return redirect(routes.home);
  }

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
        <DID did={session.user.did!} />
        <AuthenticationTokenSection token={session.token} />
      </Stack>
    </>
  );
}
