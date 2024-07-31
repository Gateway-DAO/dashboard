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
};

export type PrivateDataAsset = {
  id: number;
  proofs: Array<any>;
  createdBy: {
    did: string;
    username: string;
    image: string;
  };
  expirationDate: string;
  structured?: boolean;
  updatedAt?: string;
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
    expirationDate: '2024-12-31',
    size: 1024,
  },
  {
    id: 2,
    mimeType: 'application/pdf',
    structured: false,
    fileName: 'document.pdf',
    proofs: [],
    createdBy: { did: 'user2', username: 'Jane', image: 'user2.jpg' },
    expirationDate: '2024-10-30',
    size: 2048,
  },
  {
    id: 3,
    structured: true,
    dataModel: { id: 'model1', schema: {} },
    dataAsset: { title: 'Data Asset 1', claim: {} },
    proofs: [],
    createdBy: { did: 'user3', username: 'Alice', image: 'user3.jpg' },
    expirationDate: '2024-12-31',
  },
];
