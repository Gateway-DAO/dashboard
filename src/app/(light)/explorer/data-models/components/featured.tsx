'use client';

import { explorerQueries } from '@/constants/queries';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import DataModelExplorerCard from '../../components/data-model-card/data-model-card';
import ExplorerFeaturedSection from '../../components/featured-section/featured-section';

export default function DataModelsExplorerFeatured() {
  const dataModels = useQuery({
    queryKey: [explorerQueries.featured_data_models],
    queryFn: () => apiPublic.explorer_data_models_featured(),
  });
  return (
    <ExplorerFeaturedSection
      title={explorerDataModels.featuredTitle}
      isLoading={dataModels.isLoading}
    >
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
      ))}
    </ExplorerFeaturedSection>
  );
}
