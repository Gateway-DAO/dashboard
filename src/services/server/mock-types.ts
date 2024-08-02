export type PrivateDataAsset = {
  id: number;
  proofs: Array<any>;
  createdBy: {
    did: string;
    username: string;
    image: string;
  };
  owner: {
    did: string;
    username: string;
    image: string;
  };
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

export const mockPrivateDataAssets: PrivateDataAsset[] = [
  {
    id: 1,
    mimeType: 'image/jpeg',
    proofs: [],
    structured: false,
    fileName: 'image1.jpg',
    createdBy: { did: 'user1', username: 'John', image: 'user1.jpg' },
    owner: { did: 'user1', username: 'John', image: 'user1.jpg' },
    expirationDate: new Date('2024-12-31'),
    updatedAt: new Date('2024-12-31'),
    size: 1024,
    createdAt: new Date(),
    tags: ['asset', 'file'],
    url: '',
  },
  {
    id: 2,
    mimeType: 'application/pdf',
    structured: false,
    proofs: [],

    fileName: 'document.pdf',
    createdBy: { did: 'user2', username: 'Jane', image: 'user2.jpg' },
    owner: { did: 'user2', username: 'Jane', image: 'user2.jpg' },
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    size: 2048,
    tags: ['asset', 'doc'],
    url: '',
  },
  {
    id: 3,
    structured: true,
    dataModel: { id: 'model1', schema: {} },
    createdBy: { did: 'user3', username: 'Alice', image: 'user3.jpg' },
    owner: { did: 'user3', username: 'Alice', image: 'user3.jpg' },
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    tags: ['asset', 'non-file'],
    url: 'http://www.google.com',
    size: 1024,
    fileName: 'credit score',
    mimeType: 'txt',
    proofs: [],
  },
];
