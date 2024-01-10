import { apiPublic } from '@/services/protocol/api';
import { SessionToken } from '@/types/user';

export default async function refreshToken(
  token: SessionToken
): Promise<SessionToken> {
  try {
    const res = await apiPublic.refresh({
      refresh_token: token.refresh_token,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.refreshToken) {
      throw error;
    }

    const newToken = res.refreshToken;

    return newToken;
  } catch (e) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
