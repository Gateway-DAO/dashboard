import { api } from '../../protocol-v3/api';

export default async function getMe(token: string) {
  try {
    const res = await api(token).me();
    const { error } = (res as any) ?? {};

    if (error) {
      throw error;
    }

    if (!res.me) {
      throw new Error("Couldn't login");
    }

    return res;
  } catch (error: any) {
    console.error('Error on get me', error);
    throw error;
  }
}
