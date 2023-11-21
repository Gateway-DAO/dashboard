'use client';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { queries } from '@/constants/queries';
import { common } from '@/locale/en/common';
import { issuePda } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import { Box } from '@mui/material';

import DataModelCard from './data-model-card';
import FeaturedSection from './featured-section';

export default function DataModelsFeatured() {
  const dataModelsIdByEnv = {
    development: [
      '6cae6620-42bd-4a12-a1f8-6ceec2847cc5',
      '2cc6e362-c146-40c8-b1b8-6eace653121d',
      'd00f5a65-86b3-4ccc-ac71-2f310cce5583',
    ],
    staging: [
      '6cae6620-42bd-4a12-a1f8-6ceec2847cc5',
      '2cc6e362-c146-40c8-b1b8-6eace653121d',
      'd00f5a65-86b3-4ccc-ac71-2f310cce5583',
    ],
    testnet: [
      '6cae6620-42bd-4a12-a1f8-6ceec2847cc5',
      '2cc6e362-c146-40c8-b1b8-6eace653121d',
      'd00f5a65-86b3-4ccc-ac71-2f310cce5583',
    ],
  };

  const env =
    (process.env.NEXT_PUBLIC_API_ENV as
      | 'development'
      | 'staging'
      | 'testnet') ?? 'development';

  const featuredDataModels = dataModelsIdByEnv[env] as string[];

  const dataModels = useQuery({
    queryKey: [queries.featured_data_models, featuredDataModels],
    queryFn: () =>
      apiPublic.data_models_featured({
        ids: featuredDataModels as string[],
      }),
  });
  return (
    <FeaturedSection title={issuePda.featured} isLoading={dataModels.isLoading}>
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelCard dataModel={dataModel} key={dataModel.id} />
      ))}
    </FeaturedSection>
  );
}
