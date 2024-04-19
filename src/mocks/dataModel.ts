import { DataModel, PermissionType, User } from '@/services/protocol/types';

import { user_default } from './user';

export const data_model_default: DataModel = {
  id: 'a00d9a3b-6884-400d-b9ca-8d091a9e1f81',
  title: 'City Names',
  description: 'Dolor sit',
  arweaveUrl: 'https://arweave.net/HTD5eW1EDxrjhk8UeFoockzxackPch0nO6-mL5BPB9A',
  createdBy: user_default as User,
  organization: null,
  tags: ['Earn', 'Marketing', 'Education'],
  consumptionPrice: 0,
  pdasIssuedCount: 0,
  uniqueIssuersCount: 0,
  revenueGenerated: 0,
  schema: {
    type: 'object',
    default: {},
    title: 'Root Schema',
    required: ['city_names'],
    properties: {
      city_names: {
        type: 'array',
        title: 'City names',
        examples: [['Recife']],
      },
    },
  },
  createdAt: '2023-11-29T20:10:51.953Z',
  permissioning: PermissionType.All,
  allowedUsers: [],
  allowedOrganizations: [],
  PDAs: [],
  featured: null,
  group: {
    createdAt: '2023-11-29T20:10:51.953Z',
    dataModels: [],
    id: '12345',
    official: true,
  },
  image: null,
  pdas: [],
  verified: true,
};
