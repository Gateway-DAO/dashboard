import {
  DataModelsMetadataType,
  DataModel,
  PublicDataAsset,
  ExplorerHomeStats,
  Transaction,
  Account,
} from './models';

export const mockAccount: Account = {
  created_at: '2024-08-27T21:23:45.7145Z',
  updated_at: '2024-08-27T21:23:45.7145Z',
  username: 'KboozEVM',
  did: 'did:gatewayid:gateway:b1038ceb61a87874a38eed3ecad27de1affbd34b574711485297457f99be8772',
  wallet_address: '0x7158d4BAD3bd698d87C64BDC8E055C8CA1A043aD',
};

export const mockDataModelsMetadata: DataModelsMetadataType = {
  tags: ['defi', 'innovation', 'ai', 'blockchain'],
  consumptionPrice: {
    min: 30,
    max: 60,
  },
  issuedCount: 50,
};
const mockDataModel: DataModel = {
  id: 87818337408516096,
  created_at: '2024-08-28T16:56:48.069732-03:00',
  updated_at: '2024-08-28T16:56:48.069732-03:00',
  title: 'Data Model Example 0 Jason',
  description: 'Lorem ipsum dolor sit amet',
  created_by:
    'did:gatewayid:gateway:e585176cf3a17740cf055d803f78aa45272b9e97c50ec1088105e63ed72293e5',
  tags: ['Finance', 'IT'],
  schema: {
    type: 'object',
    default: {},
    title: 'Heurist AI Data Model',
    required: ['model_id', 'prompt', 'num_steps'],
    properties: {
      model_id: {
        type: 'string',
        title: 'Model ID',
      },
      prompt: {
        type: 'string',
        title: 'Prompt',
      },
      num_steps: {
        type: 'number',
        title: 'Number of Steps',
        default: 30,
      },
    },
  } as any,
};

export const mockDataModels: DataModel[] = [
  {
    id: 87818337408516096,
    created_at: '2024-08-28T16:56:48.069732-03:00',
    updated_at: '2024-08-28T16:56:48.069732-03:00',
    ...mockDataModel,
  },
  {
    id: 87818361215385600,
    created_at: '2024-08-28T16:57:02.261564-03:00',
    updated_at: '2024-08-28T16:57:02.261564-03:00',
    ...mockDataModel,
  },
  {
    id: 87818362238795776,
    created_at: '2024-08-28T16:57:02.862531-03:00',
    updated_at: '2024-08-28T16:57:02.862531-03:00',
    ...mockDataModel,
  },
  {
    id: 87818363564195840,
    created_at: '2024-08-28T16:57:03.653842-03:00',
    updated_at: '2024-08-28T16:57:03.653842-03:00',
    ...mockDataModel,
  },
  {
    id: 87818364721823744,
    created_at: '2024-08-28T16:57:04.348974-03:00',
    updated_at: '2024-08-28T16:57:04.348974-03:00',
    ...mockDataModel,
  },
  {
    id: 87818365946560512,
    created_at: '2024-08-28T16:57:05.075541-03:00',
    updated_at: '2024-08-28T16:57:05.075541-03:00',
    ...mockDataModel,
  },
];

const mockPublicDataAsset: PublicDataAsset = {
  fid: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  data_model_id: mockDataModel.id,
  name: 'Data Asset Example 0 Jason',
  type: 'structured',
  tags: ['Finance', 'IT'],
  issuer: mockAccount,
  created_at: '2024-08-28T16:57:05.075541-03:00',
  updated_at: '2024-08-28T16:57:05.075541-03:00',
  expiration_date: '2024-12-31T00:00:00.000Z',
};

export const mockPublicDataAssets: PublicDataAsset[] = [
  {
    ...mockPublicDataAsset,
    fid: '4fff1352-2480-4fce-8b34-c095f4d9463b',
  },
  {
    ...mockPublicDataAsset,
    fid: '4fff1352-2480-4fce-8b34-c095f4d9463c',
  },
  {
    ...mockPublicDataAsset,
    fid: '4fff1352-2480-4fce-8b34-c095f4d9463d',
  },
];

export const mockExplorerHomeStats: ExplorerHomeStats = {
  pdasIssued: 1000,
  totalUsers: 1000,
  transactionsCount: 100,
  uniqueIssuers: 10,
};

export enum mockTransactionType {
  PdaIssuance,
}

export const mockMetaData = {
  metadata: {
    pda: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    status: 'ACTIVE',
    issuer:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    signedBy:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    expirationDate: '2023-12-31T00:00:00.000Z',
    dataModel: 'DataModel123',
  },
};

export const mockTransactions: Transaction[] = [
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.5 OWN',
      solana: '0.05 SOL',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
  {
    solanaTransactionId:
      '5PHairtiFxFGydbtN4sR41zXzQ5gKiJ89ANyLFoWPPVhjFq4AcDfgCaHgJrDi8j3hfMsBNJAgJ3NyUo8ztH1AN2n',
    createdAt: new Date(),
    fee: {
      gateway: '0.5 OWN',
      solana: '0.05 SOL',
    },
    signature:
      '0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    source:
      'did:gatewayid:0x8a0ef21fc63f0ae2e6e6ac5106c41083d5e38fcd14351e7c148f6bd6fa982435',
    transactionId: '4fff1352-2480-4fce-8b34-c095f4d9463a',
  },
];
