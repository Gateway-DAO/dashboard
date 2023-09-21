import { Session } from 'next-auth';

import { AuthType } from '@/services/protocol/types';

import { Step } from '../types';

export default function getStep(session: Session | null): Step {
  if (!session) return 'initial';
  const hasEmail = !!session.user.authentications?.some(
    (au) => au.type === AuthType.Email
  );
  if (!hasEmail && !session.skipEmail) return 'add-email';
  if (!session.user.gatewayId) return 'choose-gatewayid';
  return 'completed';
}
