import { DecryptedData } from '@/services/next-auth/libs/get-decrypted-data';
import { MeQuery } from '@/services/protocol-v3/types';
import { Login_DataFragment } from '@/services/protocol/types';

// TODO: Remove after V3
export type SessionToken = Login_DataFragment & {
  error?: any;
  skipEmail?: boolean;
};

type UserV3Data = Omit<MeQuery, 'me'> & {
  user: MeQuery['me'];
};

export type LoginSessionV3 = {
  privateKey: string;
  token: string;
} & UserV3Data;

export type SessionV3 = LoginSessionV3 & DecryptedData;
