import { Metadata } from 'next';

import { apiPublic } from '@/services/protocol/api';

import PDAItem from '../../../data-asset/[id]/components/pda-item';

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

export default async function PdaDetails({
  params,
}: {
  params: { id: string };
}) {
  const pda = await getPDA(params.id);
  return <PDAItem pda={pda} viewOnly={true} />;
}
