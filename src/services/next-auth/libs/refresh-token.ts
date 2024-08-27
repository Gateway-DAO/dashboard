import { authApi } from '@/services/api/api';

export default async function refreshToken(token: string) {
  try {
    const { data, error } = await authApi(token).GET('/auth/refresh-token');

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Couldn't login");
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}
