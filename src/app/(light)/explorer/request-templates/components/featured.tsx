'use client';

import { explorerRequestTemplates } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import ExplorerFeaturedSection from '../../components/featured-section/featured-section';
import RequestTemplateExplorerCard from '../../components/request-template-card/request-template-card';

export default function RequestTemplatesExplorerFeatured() {
  const requestTemplates = useQuery({
    queryKey: ['request-templates-featured'],
    queryFn: () => apiPublic.explorer_request_templates_featured(),
  });
  return (
    <ExplorerFeaturedSection
      title={explorerRequestTemplates.featuredTitle}
      isLoading={requestTemplates.isLoading}
    >
      {requestTemplates.data?.dataRequestTemplates.map((requestTemplate) => (
        <RequestTemplateExplorerCard
          requestTemplate={requestTemplate}
          key={requestTemplate.id}
        />
      ))}
    </ExplorerFeaturedSection>
  );
}
