/* eslint-disable @typescript-eslint/ban-types */

import { DeepRequired } from 'react-hook-form';

import { components } from './types';

export type PaginatedResponse<T = any> = DeepRequired<
  Omit<components['schemas']['helper.PaginatedResponse'], 'data'>
> & { data?: T[] };

export type Account = components['schemas']['model.MyAccountResponse'];

export type TokenResponse = Required<
  components['schemas']['model.TokenResponse']
>;

export type DataModel = components['schemas']['model.DataModel'];

export type PublicDataAsset = components['schemas']['model.PublicDataAsset'];

export type PublicDataAssetType = 'Structured Data' | `${string}/${string}`;

// COnvert to enum

export enum PublicDataAssetTypeEnum {
  StructuredData = 'Structured Data',
  UnstructedData = 'Other',
}

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
