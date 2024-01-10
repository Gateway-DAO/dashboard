import { Metadata } from 'next';
import { Session } from 'next-auth';

import { GtwSessionProvider } from '@/context/gtw-session-provider';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import CreateOrgLayout from './components/create-org-layout';
import CreateOrgStructure from './components/structure';

export const metadata: Metadata = {
  title: 'Create Organization - Gateway Network',
};

export default async function CreateOrg() {
  const session = (await getGtwServerSession()) as Session;

  return (
    <GtwSessionProvider session={session}>
      <CreateOrgLayout>
        <CreateOrgStructure />
      </CreateOrgLayout>
    </GtwSessionProvider>
  );
}
