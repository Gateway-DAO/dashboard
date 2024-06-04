import { DecryptedData } from '@/services/next-auth/libs/get-decrypted-data';
import { MeQuery } from '@/services/protocol-v3/types';
import { Login_DataFragment } from '@/services/protocol/types';

// TODO: Remove after V3
export type SessionToken = Login_DataFragment & {
  error?: any;
  skipEmail?: boolean;
};

export type LoginSessionV3 = {
  privateKey: string;
  token: string;
  data: DecryptedData;
};

export type SessionV3 = LoginSessionV3 & {
  user: MeQuery['me'];
};
