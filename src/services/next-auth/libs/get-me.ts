import { SessionUser } from '@/types/user';

import { api } from '../../protocol/api';

export default async function getMe(token: string): Promise<SessionUser> {
  try {
    const res = await api(token).me();
    const { error } = (res as any) ?? {};

    if (error) {
      throw error;
    }

    if (!res.me) {
      throw new Error("Couldn't login");
    }

    return { ...res.me, ...res.myWallet };
  } catch (error: any) {
    throw error;
  }
}
