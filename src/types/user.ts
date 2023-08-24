import {
  LoginOutput,
} from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export type SessionToken = Omit<LoginOutput, 'user'> & {
  error?: any;
  user: PartialDeep<LoginOutput["user"]>;
};

