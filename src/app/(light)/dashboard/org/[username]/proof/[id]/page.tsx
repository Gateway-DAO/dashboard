import { Metadata } from 'next';

import ProofItem from '@/app/(light)/dashboard/user/proof/[id]/components/proof-item';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { getSessionOrg } from '@/utils/currentOrg';

const getProof = async (id: string): Promise<Proof | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const proof: any = (await privateApi.proof({ id }))?.proof;
  return proof;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const proof = await getProof(params.id);
  return {
    title: `Shared Data ${proof?.id} - Gateway Network`,
  };
}

export default async function OrgProofPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  const proof = await getProof(params.id);
  const organization = await getSessionOrg(params.username || '');

  return (
    <>
      <TopBarContainer>
        <BackButton
          href={routes.dashboard.org.receivedProofs(organization?.did)}
        />
      </TopBarContainer>
      <ProofItem proof={proof as Proof} />
    </>
  );
}
