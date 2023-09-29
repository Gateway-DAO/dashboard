import { Session } from 'next-auth';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

export const getCurrentOrg = async (pathName: string) => {
  const session = (await getGtwServerSession()) as Session;
  const organization = session?.user?.accesses?.find(
    (access) => access.organization?.gatewayId === pathName
  )?.organization;
  return organization;
};
