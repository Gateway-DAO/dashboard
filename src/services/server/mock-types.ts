type StructuredDataAsset = {
  dataModel?: {
    id: string;
    schema: {};
  };
  dataAsset?: {
    title: string;
    claim: {};
  };
};

type FileDataAsset = {
  mimeType?: string;
  size?: number;
  fileName?: string;
  url?: string;
};

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
} & StructuredDataAsset &
  FileDataAsset;

export const mockPrivateDataAssets: PrivateDataAsset[] = [
  {
    id: 1,
    mimeType: 'image/jpeg',
    structured: false,
    fileName: 'image1.jpg',
    proofs: [],
    createdBy: { did: 'user1', username: 'John', image: 'user1.jpg' },
    owner: { did: 'user1', username: 'John', image: 'user1.jpg' },
    expirationDate: new Date('2024-12-31'),
    updatedAt: new Date('2024-12-31'),
    size: 1024,
    createdAt: new Date(),
    tags: ['asset', 'file'],
  },
  {
    id: 2,
    mimeType: 'application/pdf',
    structured: false,
    fileName: 'document.pdf',
    proofs: [],
    createdBy: { did: 'user2', username: 'Jane', image: 'user2.jpg' },
    owner: { did: 'user2', username: 'Jane', image: 'user2.jpg' },
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    size: 2048,
    tags: ['asset', 'doc'],
  },
  {
    id: 3,
    structured: true,
    dataModel: { id: 'model1', schema: {} },
    dataAsset: { title: 'Data Asset 1', claim: {} },
    proofs: [],
    createdBy: { did: 'user3', username: 'Alice', image: 'user3.jpg' },
    owner: { did: 'user3', username: 'Alice', image: 'user3.jpg' },
    expirationDate: new Date('2024-10-30'),
    updatedAt: new Date('2024-10-30'),
    createdAt: new Date(),
    tags: ['asset', 'non-file'],
  },
];
