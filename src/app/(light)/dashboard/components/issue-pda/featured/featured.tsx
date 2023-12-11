'use client';

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

import FeaturedCard from './featured-card';

export default function DataModelsFeatured() {
  const dataModels = useQuery({
    queryKey: [queries.featured_data_models],
    queryFn: () => apiPublic.data_models_featured(),
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
                <FeaturedCard key={dataModel.id} dataModel={dataModel} />
              ))}
            </FeaturedSection>
            <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, px: CONTAINER_PX }} />
          </>
        )}
    </>
  );
}
