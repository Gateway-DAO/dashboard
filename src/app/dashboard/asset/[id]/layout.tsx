import { Metadata } from 'next';

import { mockPublicDataAssets } from '@/services/api/mocks';

import PDAPage from './page';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pda = mockPublicDataAssets.find((pda) => pda.fid === params.id);
  return {
    title: `${pda?.name} - Gateway`,
  };
}

export default PDAPage;
