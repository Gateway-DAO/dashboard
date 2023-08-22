import { apiPublic } from '@/services/protocol/api';
import { PdaQuery } from '@/services/protocol/types';

import PDAItem from './pda-item';

const getPDA = async (): Promise<PdaQuery['credential']> => {
  const pda = await apiPublic.pda({
    id: '0c0ff388-23e7-47ec-9175-1bcd7880877c',
  });
  return pda.credential;
};

export default async function PDARequest() {
  const pda = await getPDA();
  return <PDAItem pda={pda} />;
}
