'use server';

import { getApiPrivate } from '@/services/protocol/api';

export async function getMyPdas(skip = 0, take = 3) {
  const apiPrivate = await getApiPrivate();
  if (!apiPrivate) {
    return null;
  }

  try {
    const pdas = (await apiPrivate.received_pdas({ take, skip }))?.myPDAs;
    return pdas;
  } catch (error) {
    console.log(error);
    return null;
  }
}
