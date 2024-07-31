import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import PDADetailPage from './components/content';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const session = await getGtwServerSession();
  if (!session) {
    return redirect(routes.login);
  }
  const pda = session.pdas.find((pda) => pda.id === parseInt(params.id, 10));

  return {
    title: `${pda?.fileName ?? pda?.dataAsset?.title} - Gateway Network`,
  };
}

export default async function PDAPage({ params }: { params: { id: string } }) {
  const session = await getGtwServerSession();
  if (!session) {
    return redirect(routes.login);
  }
  const pda = session.pdas.find((pda) => pda.id === parseInt(params.id, 10));

  const org: any = undefined;

  if (!pda) {
    return redirect(routes.dashboard.user.myAssets);
  }

  const isOwner = pda.owner.did === session.user.did;

  return (
    <PDADetailPage
      isOwner={isOwner}
      pda={pda}
      org={org}
      backHref={
        !!org
          ? routes.dashboard.org.issuedAssets(org?.did)
          : routes.dashboard.user.myAssets
      }
    />
  );
}
