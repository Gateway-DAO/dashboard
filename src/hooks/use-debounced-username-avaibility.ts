import { useState } from 'react';

import { getClientPrivateApi } from '@/services/protocol/api';
import { useDebouncedCallback, useThrottledCallback } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

type AvaibilityState = 'idle' | 'loading' | 'success' | 'invalid';

export default function useDebouncedUsernameAvaibility() {
  const [avaibility, setAvaibility] = useState<AvaibilityState>('idle');

  const checkAvaibility = useMutation({
    mutationKey: ['check-avaibility'],
    mutationFn: async (username: string) => {
      const {  } = await (
        await getClientPrivateApi()
      ).check_username_avaibility({ username });
      return checkUsernameAvailability;
    },
    onSuccess: (valid) => {
      if (avaibility !== 'idle') {
        setAvaibility(valid ? 'success' : 'invalid');
      }
    },
    onError: () => {
      if (avaibility !== 'idle') {
        setAvaibility('invalid');
      }
    },
  });

  const onCheckAvaibility = useDebouncedCallback(
    checkAvaibility.mutate,
    [checkAvaibility.mutate],
    1000
  );

  const onStartCheckAvaibility = () => {
    setAvaibility('loading');
  };

  const onResetAvaibility = () => {
    setAvaibility('idle');
  };

  return {
    avaibility,
    onStartCheckAvaibility,
    onCheckAvaibility,
    onResetAvaibility,
  };
}
