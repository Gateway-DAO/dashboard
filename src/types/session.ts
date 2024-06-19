import { PrivateDataAsset } from '@/services/protocol-v3/types';

export type SessionUpdate = {
  type: 'pdas';
  pdas: PrivateDataAsset[];
};
