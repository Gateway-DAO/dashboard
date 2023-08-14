import {
  LoginOutput,
  MeQuery,
} from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export type SessionToken = Omit<LoginOutput, 'user'> & {
  error?: any;
};

export type SessionUser = PartialDeep<MeQuery['me']>;
