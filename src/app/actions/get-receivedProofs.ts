'use server';

import { getApiPrivate } from '@/services/protocol/api';

export async function getReceivedProofs(skip = 0, take = 3) {
  const apiPrivate = await getApiPrivate();
  if (!apiPrivate) {
    return null;
  }

  try {
    const proofs = (await apiPrivate.receivedProofs({ take, skip }))
      ?.receivedProofs;
    return proofs;
  } catch (error) {
    console.log(error);
    return null;
  }
}
