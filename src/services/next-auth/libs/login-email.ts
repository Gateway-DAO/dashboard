import { getErrorMessage } from '@/locale/en/errors';
import { apiPublic } from '@/services/protocol/api';
import { SessionToken } from '@/types/user';

export default async function loginEmail(
  email: string,
  code: number
): Promise<SessionToken> {
  try {
    const res = await apiPublic.login_email({
      email,
      code,
    });

    const { error } = (res as any) ?? {};

    if (error) {
      throw error;
    }

    if (!res.loginEmail) {
      throw new Error("Couldn't login");
    }

    const token = res.loginEmail;

    return token;
  } catch (error: any) {
    const errorObj = getErrorMessage(error);
    console.error('Login with email error', errorObj);
    throw new Error(errorObj.code, {
      cause: error,
    });
  }
}
