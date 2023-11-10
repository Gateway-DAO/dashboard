'use client';
import routes from '@/constants/routes';
import { explorerDataModels } from '@/locale/en/datamodel';
import { explorer_home } from '@/locale/en/explorer-home';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import DataModelExplorerCard from '../../../components/data-model-card/data-model-card';
import ExplorerFeaturedSection from '../../../components/featured-section/featured-section';

export default function FeaturedDataModels() {
  const dataModels = useQuery({
    queryKey: ['request-templates-featured'],
    queryFn: () => apiPublic.explorer_data_models_featured(),
  });
  return (
    <ExplorerFeaturedSection
      title={explorer_home.data_models}
      viewMore={{
        href: routes.explorer.dataModels,
        label: explorerDataModels.view_more,
      }}
      isLoading={dataModels.isLoading}
    >
      {dataModels.data?.dataModels.map((dataModel) => (
        <DataModelExplorerCard key={dataModel.id} dataModel={dataModel} />
      ))}
    </ExplorerFeaturedSection>
  );
}
