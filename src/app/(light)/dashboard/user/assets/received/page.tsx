import { getApiPrivate } from '@/services/protocol/api';

import PDAsList from '../components/pdas-list';

export default async function DataAssetsPage() {
  const apiPrivate = await getApiPrivate()
  if (!apiPrivate) {
    return null
  }
  const pdas = (await apiPrivate.pdas())?.credentials

  return <PDAsList pdas={pdas ?? []} />
}
