'use client';

import { useSession } from 'next-auth/react';

import { authApi } from '@/services/api/api';
import { Account } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

type Query = ReturnType<typeof useQuery<Account | undefined>>;
type QueryWithUser = Query & { user?: Account };

export function useMe(): QueryWithUser {
  const { data: session } = useSession({
    required: true,
  });
  const token = session?.token;
  const query = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      const { data } = await authApi(token!).GET('/accounts/me');
      return data;
    },
    enabled: !!token,
    throwOnError: true,
  });
  (query as QueryWithUser).user = query.data;
  return query;
}
