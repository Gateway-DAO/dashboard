import { Metadata } from 'next';

import PDAPage from '@/app/dashboard/user/asset/[id]/page';
import { getPDA } from '@/services/server-functions/pda';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pda = await getPDA(params.id);
  return {
    title: `${pda?.dataAsset?.title} | Data Asset - Gateway Network`,
    description: pda?.dataAsset?.description,
  };
}

export default function PDAOrgPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  return <PDAPage params={params} />;
}
