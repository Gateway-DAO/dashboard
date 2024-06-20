import { PrivateDataAsset } from '@/services/protocol-v3/types';

export type DecryptedData = {
  pdas: PrivateDataAsset[];
  shared: PrivateDataAsset[];
};

export default async function getDecryptedData(
  token: string,
  privateKey: string
): Promise<DecryptedData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-private-key': privateKey,
      },
      method: 'GET',
      next: {
        revalidate: 60 * 60,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (error: any) {
    console.log('Error on get decrypted data', error);
    throw error;
  }
}

export async function hasDecryptedData(
  token: string,
  privateKey: string
): Promise<DecryptedData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BFF_API_SERVER}user/check-data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-private-key': privateKey,
        },
        method: 'GET',
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (error: any) {
    console.log('User doesnt have data', error);
    throw error;
  }
}
