import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

import routes from '@/constants/routes';

import { useStepState } from '../providers/step-provider';
import { Step } from '../types';

export default function getStep(session: Session | null): Step {
  if (!session) return 'initial';
  if (!session.user.gatewayId) return 'choose-gatewayid';
  return 'completed';
}

export function useStepHandler() {
  const { setStepState } = useStepState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onHandleSession = async () => {
    const session = await getSession();
    const step = getStep(session);
    switch (step) {
      case 'choose-gatewayid':
        setStepState({ step: 'choose-gatewayid' });
        break;
      case 'completed':
        const callbackUrl = searchParams.get('callbackUrl');
        router.push(callbackUrl ?? routes.dashboardUserHome);
        break;
    }
  };

  return onHandleSession;
}
