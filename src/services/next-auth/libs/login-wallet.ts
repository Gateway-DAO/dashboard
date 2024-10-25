import { api } from '@/services/api/api';
import { AuthRequest } from '@/services/api/models';

export default async function loginWallet(body: AuthRequest) {
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

    return data;
  } catch (error: any) {
    throw error;
  }
}
