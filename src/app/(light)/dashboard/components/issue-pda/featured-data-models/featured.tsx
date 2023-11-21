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
    queryFn: () => apiPublic.data_models_featured(),
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
