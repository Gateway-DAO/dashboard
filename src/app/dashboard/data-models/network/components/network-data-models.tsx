'use client';

import { clientApi } from '@/services/api/client';
import { DataModel } from '@/services/api/models';

import DataModelList from '../../components/data-model-list';

export default function NetworkDataModels() {
  const { isLoading, isSuccess, data } = clientApi.useQuery(
    'get',
    '/data-models'
  );

  return (
    <DataModelList
      isLoading={isLoading}
      isSuccess={isSuccess}
      data={data as DataModel[]}
    />
  );
}
