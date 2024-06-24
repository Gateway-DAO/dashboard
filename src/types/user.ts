import { DecryptedData } from '@/services/next-auth/libs/get-decrypted-data';
import { MeQuery } from '@/services/protocol-v3/types';

type UserV3Data = Omit<MeQuery, 'me'> & {
  user: MeQuery['me'];
};

export type LoginSessionV3 = {
  privateKey: string;
  token: string;
  injectData: DecryptedData;
} & UserV3Data;

export type SessionV3 = LoginSessionV3 & DecryptedData;
