import { useDeferredValue, useEffect } from 'react';

import { queries } from '@/constants/queries';
import { apiPublic } from '@/services/protocol/api';
import { UserIdentificationInput } from '@/services/protocol/types';
import { useDebouncedState } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

export default function OwnerPreview() {
  const { watch } = useFormContext();
  const owner: UserIdentificationInput = watch('owner');
  const [debouncedOwner, setDebouncedOwner] = useDebouncedState(owner, 1000);

  useEffect(() => {
    setDebouncedOwner({
      type: owner?.type,
      value: owner?.value,
    });
  }, [owner?.type, owner?.value]);

  const { data } = useQuery({
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

  return <div>{JSON.stringify(data)}</div>;
}
