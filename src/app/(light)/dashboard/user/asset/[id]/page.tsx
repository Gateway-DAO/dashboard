import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import PDADetailPage from './components/content';

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

  const isOwner = pda.owner.did === session.user.did;

  return <PDADetailPage isOwner={isOwner} pda={pda} org={org} />;
}
