import { Session } from 'next-auth';

import { LoginStep } from './types';

export default function getLoginStep(session: Session | null): LoginStep {
  if (!session) return 'initial';
  //TODO: IMPLEMENT API CONNECTION
  if (!session.user?.name) return 'choose-gatewayid';
  return 'completed';
}
