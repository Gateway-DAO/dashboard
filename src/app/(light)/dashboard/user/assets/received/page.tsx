import { getApiPrivate } from '@/services/protocol/api';

import PDAsList from '../components/pdas-list';

export default async function DataAssetsPage() {
  const apiPrivate = await getApiPrivate();
  if (!apiPrivate) {
    return null;
  }

  const pdas = (await apiPrivate.received_pdas({ take: 6, skip: 0 }))?.myPDAs;

  return <PDAsList pdas={pdas} />;
}
