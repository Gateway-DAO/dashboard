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
  const dataModels = useQuery({
    queryKey: [queries.featured_data_models],
    queryFn: () =>
      apiPublic.data_models_featured({
        ids: [
          '6cae6620-42bd-4a12-a1f8-6ceec2847cc5',
          '2cc6e362-c146-40c8-b1b8-6eace653121d',
          'ddfbbcca-7b84-43be-92b9-405194a8d682',
        ],
      }),
  });
  return (
    <>
      <FeaturedSection
        title={issuePda.featured}
        isLoading={dataModels.isLoading}
      >
        {dataModels.data?.dataModels.map((dataModel) => (
          <DataModelCard dataModel={dataModel} key={dataModel.id} />
        ))}
      </FeaturedSection>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <LoadingButton variant="outlined">
          {common.actions.load_more}
        </LoadingButton>
      </Box>
    </>
  );
}
