import { MeQuery } from '@/services/protocol-v3/types';
import {
  Login_DataFragment,
  MeQuery as MeQueryV2,
} from '@/services/protocol/types';

// TODO: Remove after V3
export type SessionUser = MeQueryV2['me'];

// TODO: Remove after V3
export type SessionToken = Login_DataFragment & {
  error?: any;
  skipEmail?: boolean;
};

// TODO: Remove after V3
export type Session = Login_DataFragment & {
  error?: any;
  user: SessionUser;
  skipEmail?: boolean;
};

export type LoginSessionV3 = {
  privateKey: string;
  token: string;
};

export type SessionV3 = {
  privateKey: string;
  token: string;
  user: MeQuery['me'];
};
