'use client';

import { useSession } from 'next-auth/react';

import { clientApi, createAuthHeader } from '@/services/api/client';
import { DataModel } from '@/services/api/models';

import DataModelList from '../../components/data-model-list';

export default function NetworkDataModels() {
  const { data: session } = useSession({ required: true });

  const { isLoading, isSuccess, data } = clientApi.useQuery(
    'get',
    '/data-models',
    { headers: createAuthHeader(session?.token) },
    { enabled: !!session }
  );

  return (
    <DataModelList
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data as DataModel[]}
    />
  );
}
