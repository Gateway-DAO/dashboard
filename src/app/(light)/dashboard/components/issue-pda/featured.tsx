'use client';

import DataModelImageCard from '@/components/data-model-image-card/data-model-image-card';
import FeaturedSection from '@/components/featured-section/featured-section';
import { queries } from '@/constants/queries';
import { issuePda } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { useQuery } from '@tanstack/react-query';

import { Divider } from '@mui/material';

import IssuePdaActions from './issue-pda-actions';

export default function DataModelsFeatured() {
  const dataModelsIdByEnv = {
    development: [
      '837e595c-0c4e-448b-aa24-a17ca75fc931',
      '8f4e76c5-094a-42c5-9bec-9893e3f2bcb9',
      '5748a261-b6b8-491e-8bd6-5f6d1a73f525',
    ],
    staging: [
      'c22d65f0-b7b1-48a9-8c13-a01e32df1f1f',
      'd1dd60e2-ea35-4359-bb49-fce76d25a55d',
      'd156ac9f-087c-4680-98d4-97fc49351208',
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
    <>
      {dataModels.data?.dataModels &&
        dataModels.data?.dataModels?.length > 0 && (
          <>
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
                  <IssuePdaActions id={dataModel.id} />
                </DataModelImageCard>
              ))}
            </FeaturedSection>
            <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, px: CONTAINER_PX }} />
          </>
        )}
    </>
  );
}
