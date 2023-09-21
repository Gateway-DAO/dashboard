import { useState } from 'react';

import { useGtwSession } from '@/context/gtw-session-provider';
import { useDebouncedCallback } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

type AvaibilityState = 'idle' | 'loading' | 'success' | 'invalid';

export default function useDebouncedUsernameAvaibility() {
  const { privateApi } = useGtwSession();
  const [avaibility, setAvaibility] = useState<AvaibilityState>('idle');

  const checkAvaibility = useMutation({
    mutationKey: ['check-avaibility'],
    mutationFn: async (username: string) => {
      setAvaibility('loading');
      const { checkGatewayIdAvaibility } =
        await privateApi.check_username_avaibility({ username });
      return checkGatewayIdAvaibility;
    },
    onSuccess: (valid) => {
      setAvaibility(valid ? 'success' : 'invalid');
    },
    onError: () => {
      setAvaibility('invalid');
    },
  });

  const onCheckAvaibility = useDebouncedCallback(
    checkAvaibility.mutate,
    [checkAvaibility.mutate],
    500,
    2000
  );

  const onResetAvaibility = () => setAvaibility('idle');

  return { avaibility, onCheckAvaibility, onResetAvaibility };
}
