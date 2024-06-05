import { Metadata } from 'next';
import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import HomeStructure from './structure';

export const metadata: Metadata = {
  title: `The Personal Data Asset Network  - Gateway Network`,
};

export default async function Home() {
  const session = (await getGtwServerSession()) as Session;
  return <HomeStructure username={session?.user?.username ?? ''} />;
}
