'use client';
import FeaturedSection from '@/components/featured-section/featured-section';
import { explorerQueries } from '@/constants/queries';
import routes from '@/constants/routes';
import { explorer_home } from '@/locale/en/explorer-home';
import { explorerRequestTemplates } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import RequestTemplateExplorerCard from '../../../components/request-template-card/request-template-card';

export default function FeaturedRequestTemplates() {
  const requestTemplates = useQuery({
    queryKey: [explorerQueries.featured_data_requests_templates],
    queryFn: () => apiPublic.explorer_request_templates_featured(),
  });
  return (
    <FeaturedSection
      title={explorer_home.request_templates}
      viewMore={{
        href: routes.explorer.requestTemplates,
        label: explorerRequestTemplates.view_more,
      }}
      isLoading={requestTemplates.isLoading}
    >
      {requestTemplates.data?.dataRequestTemplates?.map((requestTemplate) => (
        <RequestTemplateExplorerCard
          key={requestTemplate.id}
          requestTemplate={requestTemplate}
        />
      ))}
    </FeaturedSection>
  );
}
