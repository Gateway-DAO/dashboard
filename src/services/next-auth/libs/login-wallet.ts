import { getErrorMessage } from '@/locale/en/errors';
import { apiPublic } from '@/services/protocol/api';
import { SessionToken } from '@/types/user';

export default async function loginWallet(
  signature: string,
  wallet: string,
  publicKey?: string
): Promise<SessionToken> {
  try {
    const res = await apiPublic.login_wallet({
      signature,
      wallet,
      publicKey: publicKey || null,
    });

    const { error } = (res as any) ?? {};

    if (error) {
      throw new Error(error);
    }

    if (error || !res.loginWallet) {
      throw new Error("Couldn't login");
    }

    const token = res.loginWallet;
    return token;
  } catch (error: any) {
    console.error('Login with wallet error', getErrorMessage(error));
    throw new Error(error);
  }
}
