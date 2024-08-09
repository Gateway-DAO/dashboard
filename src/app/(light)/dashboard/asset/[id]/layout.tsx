import { Metadata } from 'next';
import PDAPage from './page';
import { mockPrivateDataAssets } from '@/services/server/mock-types';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pda = mockPrivateDataAssets.find((pda) => pda.id === params.id);
  return {
    title: `${pda?.fileName} - Gateway`,
  };
}

export default PDAPage;
