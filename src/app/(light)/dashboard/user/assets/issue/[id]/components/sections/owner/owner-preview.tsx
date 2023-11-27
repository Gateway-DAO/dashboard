import { useEffect } from 'react';

import { queries } from '@/constants/queries';
import { apiPublic } from '@/services/protocol/api';
import {
  UserIdentificationInput,
  UserIdentifierType,
} from '@/services/protocol/types';
import { useDebouncedState } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

export default function OwnerPreview() {
  const { watch, setError, clearErrors } = useFormContext();
  const owner: UserIdentificationInput = watch('owner');
  const [debouncedOwner, setDebouncedOwner] = useDebouncedState(owner, 1000);

  useEffect(() => {
    setDebouncedOwner({
      type: owner?.type,
      value: owner?.value,
    });
  }, [owner?.type, owner?.value]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: [queries.user_info, debouncedOwner?.type, debouncedOwner?.value],
    queryFn: () =>
      apiPublic.get_user_info({
        identification: {
          type: debouncedOwner?.type,
          value: debouncedOwner?.value,
        },
      }),
    enabled:
      !!debouncedOwner?.type &&
      !!debouncedOwner?.value &&
      !!debouncedOwner.value.length,
  });

  useEffect(() => {
    if (
      isSuccess &&
      !data?.user &&
      debouncedOwner.type === UserIdentifierType.GatewayId
    ) {
      setError('owner', {
        type: 'manual',
        message: 'User not found',
      });
    } else if (isSuccess) {
      clearErrors('owner');
    }
  }, [isSuccess, data]);

  return <div>{JSON.stringify(data)}</div>;
}
