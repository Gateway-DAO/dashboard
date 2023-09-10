import { useSession } from 'next-auth/react';

import { api } from '@/services/protocol/api';

export default function usePrivateApi() {
  const { data } = useSession();
  return api(data?.token ?? '');
}
