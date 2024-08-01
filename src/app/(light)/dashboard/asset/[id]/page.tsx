import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import routes from '@/constants/routes';

import PDADetailPage from './components/content';
import { mockPrivateDataAssets } from '@/services/server/mock-types';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pda = mockPrivateDataAssets.find(
    (pda) => pda.id === parseInt(params.id, 10)
  );

  return {
    title: `${pda?.fileName ?? pda?.dataAsset?.title} - Gateway Network`,
  };
}

export default async function PDAPage({ params }: { params: { id: string } }) {
  const pda = mockPrivateDataAssets.find(
    (pda) => pda.id === parseInt(params.id, 10)
  );

  const org: any = undefined;

  if (!pda) {
    return redirect(routes.dashboard.user.home);
  }

  const isOwner = true;

  return (
    <PDADetailPage
      isOwner={isOwner}
      pda={pda}
      org={org}
      backHref={routes.dashboard.user.home}
    />
  );
}
