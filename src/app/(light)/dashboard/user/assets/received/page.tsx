import { getMyPdas } from '@/app/actions/get-myPdas';

import InfiniteLoadMore from '../components/infinite-load-more';
import PDAsList from '../components/pdas-list';

export default async function DataAssetsPage() {
  const pdas = await getMyPdas(0, 6);

  return (
    <>
      <PDAsList pdas={pdas ?? []} />
      <InfiniteLoadMore />
    </>
  );
}
