import { Metadata } from 'next';
import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import HomeStructure from './components/home-structure';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `The Personal Data Asset Network  - Gateway Network`,
  };
}

export default async function Home() {
  const session = (await getGtwServerSession()) as Session;
  return (
    <HomeStructure
      username={session?.user?.displayName ?? session?.user?.gatewayId ?? ''}
    />
  );
}
