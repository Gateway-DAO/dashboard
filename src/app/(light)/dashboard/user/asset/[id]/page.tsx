import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { api } from '@/services/protocol-v3/api';

import PDADetailPage from './components/pda-detail-page';

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
  if (!pda?.activity?.id) {
    return null;
  }
  const activity = await api(session.token).activity({ id: pda.activity.id });

  if (
    !('dataModel' in activity?.activity?.metadata) ||
    !activity.activity.metadata.dataModel
  ) {
    return null;
  }

  const dataModel = await api(session.token).dataModel({
    id: activity.activity.metadata.dataModel,
  });

  if (!dataModel?.dataModel) {
    return null;
  }

  return <PDADetailPage pda={pda} org={org} dataModel={dataModel.dataModel} />;
}
