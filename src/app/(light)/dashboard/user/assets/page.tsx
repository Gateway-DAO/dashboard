import { getServerSession } from '@/services/next-auth/get-server-session';
import { getApiPrivate } from '@/services/protocol/api';

import PDAsList from './components/pdas-list';

export default async function DataAssetsPage() {
  const apiPrivate = await getApiPrivate();
  const session = await getServerSession();

  console.log(session);

  if (!apiPrivate) {
    return null;
  }

  const pdas = (
    await apiPrivate.received_pdas({
      id: session?.protocol_id ?? '',
      take: 5,
      skip: 0,
    })
  )?.findCredentialsByRecipientUser;

  return <PDAsList pdas={pdas ?? []} />;
}
