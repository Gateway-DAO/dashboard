import { Session } from 'next-auth';

import { Step } from '../types';

export default function getStep(session: Session | null): Step {
  if (!session) return 'initial';
  if (!session.user.gatewayId) return 'choose-gatewayid';
  return 'completed';
}
