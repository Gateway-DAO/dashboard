import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPrivateApi } from '@/services/protocol/api';
import { PdaQuery } from '@/services/protocol/types';
import { getCurrentOrg } from '@/utils/currentOrg';

import PDAItem from './components/pda-item';

const getPDA = async (id: string): Promise<PdaQuery['PDA'] | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const pda = (await privateApi.pda({ id }))?.PDA;
  return pda;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pda = await getPDA(params.id);
  return {
    title: `${pda?.dataAsset?.title} PDA - Gateway Network`,
    description: pda?.dataAsset?.description,
  };
}

export default async function PDAPage({
  params,
  asOrg,
}: {
  params: { id: string; username: string };
  asOrg?: boolean;
}) {
  const pda = await getPDA(params.id);
  const org = await getCurrentOrg(params.username);

  return (
    <>
      <TopBarContainer>
        <BackButton
          href={
            asOrg
              ? routes.dashboardOrgIssuedAssets(org?.gatewayId)
              : routes.dashboardUserReceivedAssets
          }
        />
      </TopBarContainer>
      <PDAItem pda={pda} />
    </>
  );
}
