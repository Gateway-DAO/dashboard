import { authApi } from '@/services/api/api';
import { AuthResponse } from '@/services/api/models';

export default async function refreshToken(
  token: string
) /* : Promise<AuthResponse> */ {
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
