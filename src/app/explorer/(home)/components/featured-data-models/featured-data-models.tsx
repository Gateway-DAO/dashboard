'use client';

import DataModelCard from '@/components/data-model-card/data-model-card';
import FeaturedSection from '@/components/featured-sections/featured-sections';

import routes from '@/constants/routes';

import { DataModelType, mockDataModels } from '@/services/api/mock-types';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedDataModels() {
  const dataModels = useQuery({
    queryKey: ['featured-data-models'],
    queryFn: async (): Promise<DataModelType[]> => {
      const mockPromise = new Promise<DataModelType[]>((resolve) => {
        setTimeout(() => {
          resolve(mockDataModels);
        }, 1500);
      });

      return mockPromise;
    },
  });

  return (
    <FeaturedSection
      title="Featured Data Models"
      viewMore={{
        href: routes.explorer.dataModels,
        label: 'View all data models',
      }}
      isLoading={dataModels.isLoading}
    >
      {dataModels.data?.map((dataModel) => (
        <DataModelCard key={dataModel.id} dataModel={dataModel} />
      ))}
    </FeaturedSection>
  );
}
