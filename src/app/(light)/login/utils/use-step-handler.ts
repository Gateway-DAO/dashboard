import { getSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

import routes from '@/constants/routes';

import { useStepState } from '../providers/step-provider';
import getStep from './get-step';

export default function useStepHandler() {
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
