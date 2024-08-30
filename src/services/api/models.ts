/* eslint-disable @typescript-eslint/ban-types */

import { DeepRequired } from 'react-hook-form';

import { components } from './types';

export type Account = components['schemas']['model.MyAccountResponse'];

export type TokenResponse = Required<
  components['schemas']['model.TokenResponse']
>;
export type DataModel = components['schemas']['model.DataModel'];

export type PaginatedResponse<T = any> = DeepRequired<
  Omit<components['schemas']['helper.PaginatedResponse'], 'data'>
> & { data?: T[] };

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  DateTimeISO: any;
  JSON: any;
  StringSchema: any;
};
export type Maybe<T> = T | null;

export type PrivateDataAsset = {
  id: string;
  proofs: Array<any>;
  access: Array<{ did: string; username: string; access: string }>;
  expirationDate: Date;
  structured: boolean;
  updatedAt: Date;
  createdAt: Date;
  tags: string[];
  size: number;
  url: string;
  dataModel?: {
    id: string;
    schema: {};
  };
  fileName: string;
  mimeType: string;
};

export type ExplorerHomeStats = {
  transactionsCount: number;
  uniqueIssuers: number;
  pdasIssued: number;
  totalUsers: number;
};

export type Transaction = {
  solanaTransactionId: string;
  transactionId: string;
  source: string;
  signature: string;
  fee: {
    solana: string;
    gateway: string;
  };
  createdAt: Date;
};

export type DataModelsMetadataType = {
  tags: string[];
  consumptionPrice: {
    min: number;
    max: number;
  };
  issuedCount: number;
};
