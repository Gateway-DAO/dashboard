'use client';

import { useSession } from 'next-auth/react';

import { clientApi, createAuthHeader } from '@/services/api/client';
import { DataModel } from '@/services/api/models';

import DataModelList from './data-model-list';

export default function MyDataModels() {
  const { data: session } = useSession({ required: true });

  const { isLoading, isSuccess, data } = clientApi.useQuery(
    'get',
    '/data-models/me',
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
