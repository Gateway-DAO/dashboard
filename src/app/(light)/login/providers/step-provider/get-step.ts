import { Session } from 'next-auth';

import { AuthType } from '@/services/protocol/types';

import { LoginStep } from './types';

export default function getLoginStep(session: Session | null): LoginStep {
  if (!session) return 'initial';
  const hasEmail = !!session.user.authentications?.some(
    (authentication: any) => authentication.type === AuthType.Email
  );
  if (!session.skipEmail && !hasEmail) return 'add-email';
  if (!session.user.gatewayId) return 'choose-gatewayid';
  return 'completed';
}
