/* eslint-disable @typescript-eslint/ban-types */

import { components } from './types';

export type Account = Required<
  components['schemas']['model.MyAccountResponse']
>;
export type TokenResponse = Required<
  components['schemas']['model.TokenResponse']
>;

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

export type DataModelType = {
  id: number;
  dataModelId: string;
  title: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  dataAssests: number;
};

export const mockDataModels: DataModelType[] = [
  {
    id: 1112121,
    title: 'Hello Gateway',
    description:
      'Welcome to Gateway, the new way to your data. This is an introductory data model used to provide developers a chance to help understand how the protocol and network works.',
    dataAssests: 10,
    dataModelId: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
  },
  {
    id: 1112122,
    title: 'Hello Gateway world',
    description:
      'Welcome to Gateway, the new way to your data. This is an introductory data model used to provide developers a chance to help understand how the protocol and network works.',
    dataAssests: 10,
    dataModelId: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    updatedAt: new Date('2024-10-28'),
    createdAt: new Date(),
  },
  {
    id: 1112123,
    title: 'Hello world',
    description:
      'Welcome to Gateway, the new way to your data. This is an introductory data model used to provide developers a chance to help understand how the protocol and network works.',
    dataAssests: 10,
    dataModelId: '6cfd080c-58c0-4c28-b34a-dc0bd11b2ec6',
    updatedAt: new Date('2024-10-31'),
    createdAt: new Date(),
  },
];

export const mockPrivateDataAssets: PrivateDataAsset[] = [
  {
    id: '4fff1352-2480-4fce-8b34-c095f4d9463a',
    mimeType: 'image/jpeg',
    proofs: [],
    structured: false,
    fileName: 'image1.jpg',
    access: [
      {
        did: 'did:4fff1352-2480-4fce-8b34-c095f4d9463a',
        username: 'John',
        access: 'Can view, update and delete',
      },
    ],
    expirationDate: new Date('2024-12-31'),
    updatedAt: new Date('2024-12-31'),
    size: 1024,
    createdAt: new Date(),
    tags: ['asset', 'file'],
    url: '',
    dataModel: { id: '4fff1352-2480-4fce-8b34-c095f4d9463a', schema: {} },
  },
  {
    id: '4fff1352-2480-4fce-8b34-c095f4d94631',
    mimeType: 'application/pdf',
    structured: false,
    proofs: [],
    access: [
      {
        did: 'did:4fff1352-2480-4fce-8b34-c095f4d9463a',
        username: 'Jane',
        access: 'Can view, update and delete',
      },
    ],
    fileName: 'document.pdf',
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    size: 2048,
    tags: ['asset', 'doc'],
    url: '',
    dataModel: { id: '4fff1352-2480-4fce-8b34-c095f4d9463a', schema: {} },
  },
  {
    id: '4fff1352-2480-4fce-8b34-c095f4d94632',
    structured: true,
    access: [
      {
        did: 'did:5e938e33-a062-4da5-8ed1-d6038eb7d574',
        username: 'Alice',
        access: 'Can view, update and delete',
      },
      {
        did: 'did:81123498-74e4-4aa7-bd5f-1890bbfb1ead',
        username: 'Jane',
        access: 'Can view and share',
      },
    ],
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    tags: ['asset', 'non-file'],
    url: 'http://www.google.com',
    size: 1024,
    fileName: 'credit score',
    mimeType: 'txt',
    proofs: [],
    dataModel: { id: '4fff1352-2480-4fce-8b34-c095f4d9463a', schema: {} },
  },
];
