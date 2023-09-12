import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getApiPrivate } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';

import ProofItem from './components/proof-item';

const getProof = async (id: string): Promise<Proof | null> => {
  const apiPrivate = await getApiPrivate();
  if (!apiPrivate) {
    return null;
  }

  const proof: any = (await apiPrivate.proof({ id }))?.proof;
  return proof;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Proof - Gateway Network`,
    description: `Proof description`,
  };
}

export default async function ProofPage({
  params,
}: {
  params: { id: string };
}) {
  const proof = await getProof(params.id);
  return (
    <>
      <TopBarContainer>
        <BackButton href={routes.dashboardUserReceivedProofs} />
      </TopBarContainer>
      <ProofItem proof={proof as Proof} />
    </>
  );
}
