import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { api } from '@/services/protocol/api';

export default function usePrivateApi() {
  const { data } = useSession();
  const privateApi = useMemo(() => {
    if (!data?.token) return null;
    return api(data?.token ?? '');
  }, [data?.token]);

  return privateApi;
}
