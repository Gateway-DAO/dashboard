import { Login_DataFragment, MeQuery } from '@/services/protocol/types';

export type SessionUser = MeQuery['me'];

export type SessionToken = Login_DataFragment & {
  error?: any;
  skipEmail?: boolean;
};

export type Session = Login_DataFragment & {
  error?: any;
  user: SessionUser;
  skipEmail?: boolean;
};
