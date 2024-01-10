import Irys from '@irys/sdk';
import { UploadResponse } from '@irys/sdk/build/esm/common/types';

const getIrys = async () => {
  const url = process.env.IRYS_NODE || 'https://devnet.irys.xyz';
  const token = process.env.IRYS_CURRENCY || 'arweave';
  const key =
    token == 'arweave'
      ? JSON.parse(process.env.IRYS_KEY as string)
      : (process.env.IRYS_KEY as string);

  const irys = new Irys({
    url,
    token,
    key,
    ...(process.env.IRYS_PROVIDER && {
      config: {
        providerUrl: process.env.IRYS_PROVIDER,
      },
    }),
  });
  return irys;
};

export const uploadData = async (
  data: string | Buffer,
  tags:
    | {
        name: string;
        value: string;
      }[]
): Promise<UploadResponse> => {
  const irys = await getIrys();

  const receipt = await irys.upload(data, { tags });

  return receipt;
};
