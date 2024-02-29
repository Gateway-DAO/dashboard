import { Metadata } from 'next';
import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { PageWithParams } from '@/types/next';

import HomeStructure from './structure';

export const metadata: Metadata = {
  title: `The Personal Data Asset Network  - Gateway Network`,
};

export default async function Home({
  params: { username },
}: PageWithParams<{ username: string }>) {
  const session = (await getGtwServerSession()) as Session;
  return (
    <HomeStructure
      username={session?.user?.displayName ?? session?.user?.gatewayId ?? ''}
      organization={username}
    />
  );
}
