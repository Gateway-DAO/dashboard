import { Metadata } from 'next';

import DashboardUserDataRequest, {
  getDataRequest,
} from '@/app/(light)/app/(dashboard)/user/request/[id]/page';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const dataRequest = await getDataRequest(params.id);

  return {
    title: `Data Request ${dataRequest?.id} - Gateway Network`,
    description: dataRequest?.dataUse,
  };
}

export default function RequestOrgPage({ params }: { params: { id: string } }) {
  return <DashboardUserDataRequest params={params} />;
}
