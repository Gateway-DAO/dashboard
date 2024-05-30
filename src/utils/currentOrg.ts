import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

export function getOrg(session: Session | null, username: string | null) {
  const access = session?.user?.accesses?.find(
    (access: any) => access.organization?.did === username
  );
  const organization = access?.organization;

  return { access, organization };
}

export const getSessionOrg = async (pathName: string) => {
  const session = (await getGtwServerSession()) as Session;
  const { organization } = getOrg(session, pathName);
  return organization;
};
