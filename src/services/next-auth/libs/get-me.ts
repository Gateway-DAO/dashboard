import { authApi } from '@/services/api/api';
import { Account } from '@/services/api/models';

export default async function getMe(token: string): Promise<Account> {
  try {
    const { data, error } = await authApi(token).GET('/accounts/me');

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Couldn't login");
    }

    return data as Account;
  } catch (error: any) {
    throw error;
  }
}
