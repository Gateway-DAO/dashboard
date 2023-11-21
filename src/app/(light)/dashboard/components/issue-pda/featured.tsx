'use client';

import DataModelImageCard from '@/components/data-model-image-card/data-model-image-card';
import FeaturedSection from '@/components/featured-section/featured-section';
import { queries } from '@/constants/queries';
import { issuePda } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import CardButtons from './card-buttons';

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
    <FeaturedSection
      title={issuePda.featured}
      isLoading={dataModels.isLoading}
      withContainer={false}
      columns={3}
    >
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelImageCard
          dataModel={dataModel}
          key={dataModel.id}
          withLink={false}
        >
          <CardButtons
            issueHref=""
            learnMoreAction={() => console.log('learn more')}
          />
        </DataModelImageCard>
      ))}
    </FeaturedSection>
  );
}
