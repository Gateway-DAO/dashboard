import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getApiPrivate } from '@/services/protocol/api';

import PDAItem from './components/pda-item';

export const getPDA = async (id: string) => {
  const apiPrivate = await getApiPrivate();
  if (!apiPrivate) {
    return null;
  }

  const pda = (await apiPrivate.pda({ id }))?.PDAbyId;
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
