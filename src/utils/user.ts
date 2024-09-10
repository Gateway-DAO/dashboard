'use client';

import { authApi } from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';

export function useMe(token?: string) {
  return useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      const { data } = await authApi(token!).GET('/accounts/me');
      return data;
    },
    enabled: !!token,
    throwOnError: true,
  });
}
