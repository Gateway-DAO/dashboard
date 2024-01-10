import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPDA } from '@/services/server-functions/pda';
import { getCurrentOrg } from '@/utils/currentOrg';

import PDAItem from './components/pda-item';

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

export default async function PDAPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  const pda = await getPDA(params.id);
  const org = await getCurrentOrg(params.username);

  return (
    <>
      <TopBarContainer>
        <BackButton
          href={
            !!org
              ? routes.dashboard.org.issuedAssets(org?.gatewayId)
              : routes.dashboard.user.receivedAssets
          }
        />
      </TopBarContainer>
      <PDAItem pda={pda} />
    </>
  );
}
