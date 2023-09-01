import { Metadata } from 'next';

import PDAItem from '@/app/dashboard/user/asset/[id]/components/pda-item';
import { apiPublic } from '@/services/protocol/api';


const getPDA = async (id: string) => {
  const pda = await apiPublic.pda({ id });
  return pda.credential;
};

export async function generateMetadata({
  params,
}: {
  params: { pdaId: string };
}): Promise<Metadata> {
  const pda = await getPDA(params.pdaId);
  return {
    title: `${pda.title} PDA - Gateway Network`,
    description: pda.description,
  };
}

export default async function PdaDetails({
  params,
}: {
  params: { id: string };
}) {
  const pda = await getPDA(params.id);
  return <PDAItem pda={pda} viewOnly={true} />;
}
