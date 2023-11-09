'use client';

import routes from '@/constants/routes';
import { explorerRequestTemplates } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import { Box, Button, Container, Typography } from '@mui/material';

import ExplorerDataCardLoading from '../data-card/data-card-loading';
import RequestTemplateExplorerCard from '../request-template-card/request-template-card';

type Props = {
  title?: string;
  viewMore?: boolean;
};

export default function RequestTemplatesExplorerFeatured({
  title,
  viewMore,
}: Props) {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: viewMore ? 4 : 0,
        }}
      >
        <Typography
          component="h3"
          variant="h5"
          sx={{
            mb: !viewMore ? 2 : 0,
          }}
        >
          {title ?? explorerRequestTemplates.featureTitle}
        </Typography>
        {viewMore && (
          <Button variant="text" href={routes.explorer.dataRequestTemplates}>
            {explorerRequestTemplates.view_more}
          </Button>
        )}
      </Box>
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
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
            <ExplorerDataCardLoading />
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
