import { Metadata } from 'next';

import ProofItem from '@/app/(light)/dashboard/user/proof/[id]/components/proof-item';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { getCurrentOrg } from '@/utils/currentOrg';

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
    title: `Data Proof ${proof?.id} - Gateway Network`,
  };
}

export default async function OrgProofPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  const proof = await getProof(params.id);
  const organization = await getCurrentOrg(params.username || '');

  return (
    <>
      <TopBarContainer>
        <BackButton
          href={routes.dashboardOrgReceivedProofs(organization?.gatewayId)}
        />
      </TopBarContainer>
      <ProofItem proof={proof as Proof} />
    </>
  );
}
