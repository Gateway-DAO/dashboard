import { useState } from 'react';

import { IdentifierValueSchema } from '@/schemas/identifier-value';
import { apiPublic } from '@/services/protocol-v3/api';
import { useDebouncedCallback } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

export enum HasUserState {
  Idle,
  Loading,
  Found,
  NotFound,
}

export default function useDebouncedHasUser() {
  const [hasUserState, setFindUserState] = useState<HasUserState>(
    HasUserState.Idle
  );

  const checkAvailability = useMutation({
    mutationKey: ['has-user'],
    mutationFn: async (identifier: IdentifierValueSchema) => {
      const { user } = await apiPublic.find_user({ input: identifier });
      return !!user;
    },
    onSuccess: (valid) => {
      if (hasUserState !== HasUserState.Idle) {
        setFindUserState(valid ? HasUserState.Found : HasUserState.NotFound);
      }
    },
    onError: () => {
      if (hasUserState !== HasUserState.Idle) {
        setFindUserState(HasUserState.NotFound);
      }
    },
  });

  const onCheckUser = useDebouncedCallback(
    checkAvailability.mutate,
    [checkAvailability.mutate],
    1000
  );

  const onStartFindUser = () => {
    setFindUserState(HasUserState.Loading);
  };

  const onResetFindUser = () => {
    setFindUserState(HasUserState.Idle);
  };

  return {
    hasUserState,
    onCheckUser: (identifier: IdentifierValueSchema) => {
      onStartFindUser();
      onCheckUser(identifier);
    },
    onResetFindUser,
  };
}
