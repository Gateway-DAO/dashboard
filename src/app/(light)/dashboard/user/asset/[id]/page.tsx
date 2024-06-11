import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import PDADetail from './PDADetail';

export default async function PDAPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  const session = await getGtwServerSession();
  if (!session) {
    return null;
  }
  const pda = session.pdas.find((pda) => pda.id === parseInt(params.id, 10));
  const org: any = undefined;
  if (!pda) {
    return null;
  }

  return <PDADetail pda={pda} org={org} />;
}
