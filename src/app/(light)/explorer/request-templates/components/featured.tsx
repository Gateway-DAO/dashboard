'use client';

import { explorerRequestTemplates } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import { Box, Container, Typography } from '@mui/material';

import RequestTemplateExplorerCard from '../../components/request-template-card/request-template-card';
import RequestTemplateExplorerCardLoading from '../../components/request-template-card/request-template-card-loading';

export default function RequestTemplatesExplorerFeatured() {
  const requestTemplates = useQuery({
    queryKey: ['request-templates-featured'],
    queryFn: () => apiPublic.explorer_request_templates_featured(),
  });
  return (
    <Container
      sx={{
        py: 3,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        {explorerRequestTemplates.featureTitle}
      </Typography>
      <Box
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {requestTemplates.isLoading && (
          <>
            <RequestTemplateExplorerCardLoading />
            <RequestTemplateExplorerCardLoading />
            <RequestTemplateExplorerCardLoading />
            <RequestTemplateExplorerCardLoading />
          </>
        )}
        {requestTemplates.data?.dataRequestTemplates.map((requestTemplate) => (
          <RequestTemplateExplorerCard
            requestTemplate={requestTemplate}
            key={requestTemplate.id}
          />
        ))}
      </Box>
    </Container>
  );
}
