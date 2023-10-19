import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPrivateApi } from '@/services/protocol/api';
import { PdaQuery } from '@/services/protocol/types';
import { getCurrentOrg } from '@/utils/currentOrg';

import PDAItem from './components/pda-item';

export const getPDA = async (id: string): Promise<PdaQuery['PDA'] | null> => {
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
              ? routes.dashboardOrgIssuedAssets(org?.gatewayId)
              : routes.dashboardUserReceivedAssets
          }
        />
      </TopBarContainer>
      <PDAItem pda={pda} />
    </>
  );
}
