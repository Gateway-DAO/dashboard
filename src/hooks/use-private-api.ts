import { useSession } from 'next-auth/react';

import { api } from '@/services/protocol/api';

export default function usePrivateApi() {
  const { data, status } = useSession();
  if (status === 'authenticated') {
    return api(data.token);
  }
  return null;
}
