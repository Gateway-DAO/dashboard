import { getPrivateApi } from '../protocol/api';
import { PdaQuery } from '../protocol/types';

export const getPDA = async (id: string): Promise<PdaQuery['PDA'] | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const pda = (await privateApi.pda({ id }))?.PDA;
  return pda;
};
