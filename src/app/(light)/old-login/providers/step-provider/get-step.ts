import { Session } from 'next-auth';

import { LoginStep } from './types';

export default function getLoginStep(session: Session | null): LoginStep {
  if (!session) return 'initial';
  if (!session.user.username) return 'choose-gatewayid';
  return 'completed';
}
