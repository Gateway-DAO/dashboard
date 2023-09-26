import { Session } from 'next-auth';
import { PropsWithChildren } from 'react';

import { GtwSessionProvider } from '@/context/gtw-session-provider';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = (await getGtwServerSession()) as Session;
  return <GtwSessionProvider session={session}>{children}</GtwSessionProvider>;
}
