import { getApiPrivate } from '@/services/protocol/api';
// import { PrivateDataAsset } from '@/services/protocol/types';
// import { QueryFunctionContext } from '@tanstack/react-query';
// import { PartialDeep } from 'type-fest';

import PDAsList from '../components/pdas-list';

export default async function DataAssetsPage() {
  const apiPrivate = await getApiPrivate();
  if (!apiPrivate) {
    return null;
  }

  const pdas = (await apiPrivate.received_pdas({ take: 2, skip: 0 }))?.myPDAs;

  return <PDAsList pdas={pdas} />;
}
