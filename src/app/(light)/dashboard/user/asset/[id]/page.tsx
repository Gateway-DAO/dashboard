import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPrivateApi } from '@/services/protocol/api';
import { PdaQuery } from '@/services/protocol/types';

import PDAItem from './components/pda-item';

const getPDA = async (
  id: string
): Promise<PdaQuery['PDAbyId'] | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const pda = (await privateApi.pda({ id }))?.PDAbyId;
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

export default async function PDAPage({ params }: { params: { id: string } }) {
  const pda = await getPDA(params.id);
  return (
    <>
      <TopBarContainer>
        <BackButton href={routes.dashboardUserReceivedAssets} />
      </TopBarContainer>
      <PDAItem pda={pda} />
    </>
  );
}
