import { api } from '@/services/api/api';
import { TokenResponse } from '@/services/api/models';
import { components } from '@/services/api/types';

export default async function loginWallet(
  body: components['schemas']['model.AuthRequest']
): Promise<TokenResponse> {
  try {
    const { error, data } = await api.POST('/auth', {
      body,
    });

    if (error) {
      if (typeof error === 'string') {
        throw new Error(error);
      }
      throw new Error(
        (error as any)?.message ?? (error as any)?.error ?? 'UNKNOWN_ERROR'
      );
    }

    if (!data || !data.token) {
      throw new Error("Couldn't login");
    }

    return data as TokenResponse;
  } catch (error: any) {
    throw error;
  }
}
