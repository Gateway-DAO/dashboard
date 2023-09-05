import { Metadata } from 'next';

import PDAItem from '@/app/(light)/dashboard/user/asset/[id]/components/pda-item';
import { apiPublic } from '@/services/protocol/api';
import { PdaQuery } from '@/services/protocol/types';

const getPDA = async (id: string): Promise<PdaQuery['PDAbyId'] | null> => {
  const pda = await apiPublic.pda({ id });
  return pda?.PDAbyId;
};

export async function generateMetadata({
  params,
}: {
  params: { pdaId: string };
}): Promise<Metadata> {
  const pda = await getPDA(params.pdaId);
  return {
    title: `${pda?.dataAsset?.title} PDA - Gateway Network`,
    description: pda?.dataAsset?.description,
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
