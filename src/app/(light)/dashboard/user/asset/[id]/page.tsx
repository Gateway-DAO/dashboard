import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { apiPublic } from '@/services/protocol/api';

import PDAItem from './components/pda-item';

const getPDA = async (id: string) => {
  const pda = await apiPublic.pda({ id });
  return pda.credential;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pda = await getPDA(params.id);
  return {
    title: `${pda.title} PDA - Gateway Network`,
    description: pda.description,
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
