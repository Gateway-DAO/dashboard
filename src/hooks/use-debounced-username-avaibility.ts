import { useState } from 'react';

import { getClientPrivateApi } from '@/services/protocol/api';
import { useThrottledCallback } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

type AvaibilityState = 'idle' | 'loading' | 'success' | 'invalid';

export default function useDebouncedUsernameAvaibility() {
  const [avaibility, setAvaibility] = useState<AvaibilityState>('idle');

  const checkAvaibility = useMutation({
    mutationKey: ['check-avaibility'],
    mutationFn: async (username: string) => {
      setAvaibility('loading');
      const { checkGatewayIdAvaibility } = await (
        await getClientPrivateApi()
      ).check_username_avaibility({ username });
      return checkGatewayIdAvaibility;
    },
    onSuccess: (valid) => {
      setAvaibility(valid ? 'success' : 'invalid');
    },
    onError: () => {
      setAvaibility('invalid');
    },
  });

  const onCheckAvaibility = useThrottledCallback(
    checkAvaibility.mutate,
    [checkAvaibility.mutate],
    500
  );

  const onResetAvaibility = () => setAvaibility('idle');

  return { avaibility, onCheckAvaibility, onResetAvaibility };
}
