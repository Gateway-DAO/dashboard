'use client';
import DataModelCard from '@/components/data-model-card/data-model-card';
import FeaturedSection from '@/components/featured-section/featured-section';
import { explorerQueries } from '@/constants/queries';
import routes from '@/constants/routes';
import { explorerDataModels } from '@/locale/en/datamodel';
import { explorer_home } from '@/locale/en/explorer-home';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedDataModels() {
  const dataModels = useQuery({
    queryKey: [explorerQueries.featured_data_models],
    queryFn: () => apiPublic.explorer_data_models_featured(),
  });
  return (
    <FeaturedSection
      title={explorer_home.data_models}
      viewMore={{
        href: routes.explorer.dataModels,
        label: explorerDataModels.view_more,
      }}
      isLoading={dataModels.isLoading}
    >
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelCard key={dataModel.id} dataModel={dataModel} />
      ))}
    </FeaturedSection>
  );
}
