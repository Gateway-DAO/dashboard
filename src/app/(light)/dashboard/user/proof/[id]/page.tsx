import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import PermissionError from '@/components/permission-error/permission-error';
import routes from '@/constants/routes';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';

import ProofItem from './components/proof-item';

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
    title: `Proof ${proof?.id} - Gateway Network`,
    description: `Proof description`,
  };
}

export default async function ProofPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getGtwServerSession();
  const userId = session?.user.id;
  const proof = await getProof(params.id);

  if (userId !== proof?.owner.id && userId !== proof?.verifier?.id) {
    return <PermissionError />;
  }

  const isOwner = userId === proof?.owner.id;

  return (
    <>
      <TopBarContainer>
        <BackButton href={routes.dashboardUserReceivedProofs} />
      </TopBarContainer>
      <ProofItem proof={proof as Proof} isOwner={isOwner} />
    </>
  );
}
