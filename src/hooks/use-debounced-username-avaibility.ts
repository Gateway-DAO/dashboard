import { useState } from 'react';

import { getClientPrivateApi } from '@/services/protocol/api';
import { useDebouncedCallback } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

export type AvailabilityState = 'idle' | 'loading' | 'success' | 'invalid';

export default function useDebouncedUsernameAvailability() {
  const [availability, setAvailability] = useState<AvailabilityState>('idle');

  const checkAvailability = useMutation({
    mutationKey: ['check-avaibility'],
    mutationFn: async (username: string) => {
      const { checkUsernameAvailability } = await (
        await getClientPrivateApi()
      ).check_username_avaibility({ username });
      return checkUsernameAvailability;
    },
    onSuccess: (valid) => {
      if (availability !== 'idle') {
        setAvailability(valid ? 'success' : 'invalid');
      }
    },
    onError: () => {
      if (availability !== 'idle') {
        setAvailability('invalid');
      }
    },
  });

  const onCheckAvailability = useDebouncedCallback(
    checkAvailability.mutate,
    [checkAvailability.mutate],
    1000
  );

  const onStartCheckAvailability = () => {
    setAvailability('loading');
  };

  const onResetAvaibility = () => {
    setAvailability('idle');
  };

  return {
    availability,
    onStartCheckAvailability,
    onCheckAvailability,
    onResetAvaibility,
  };
}
