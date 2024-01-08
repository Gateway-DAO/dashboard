import { Metadata } from 'next';

import { explorerRequestTemplateDetailOverview } from '@/locale/en/request-template';
import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';
import { numberToMoneyString } from '@/utils/money';

import { Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';

import RequestTemplateDetails from './components/details';
import RequestTemplateDetailHeader from './components/header';
import RequestedData from './components/requested-data';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Gateway Request Template - ${params.id}`,
    description: `Details on how verifiers are using this request template and stats about its performance`,
  };
}

export default async function RequestTemplatePage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataRequestTemplate } =
    await apiPublic.explorer_request_template_detail_overview({
      id,
    });

  const stats = [
    {
      label: 'Unique verifiers',
      value: dataRequestTemplate?.uniqueVerifiersCount ?? 0,
    },
    {
      label: 'Data requests',
      value: dataRequestTemplate?.dataRequestsCount ?? 0,
    },
    {
      label: 'Revenue generated',
      value: numberToMoneyString(
        dataRequestTemplate?.revenueGenerated as number
      ),
    },
  ];

  return (
    <>
      <RequestTemplateDetailHeader
        id={dataRequestTemplate?.id as string}
        title={dataRequestTemplate?.name as string}
        tags={dataRequestTemplate?.tags as string[]}
      />
      <Container sx={{ pb: 4 }}>
        <Box sx={{ maxWidth: 896 }}>
          <Typography color="text.secondary" whiteSpace="pre-wrap">
            {dataRequestTemplate?.description}
          </Typography>
          <Stack
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            gap={1}
            sx={{ mt: 4, mb: 3 }}
          >
            {stats.map((stat) => (
              <Stack
                key={stat.label}
                gap={2}
                justifyContent="space-between"
                sx={{
                  backgroundColor: 'primary.light',
                  p: 2,
                  borderRadius: 1,
                  flex: 1,
                }}
              >
                <Typography variant="subtitle1" color="#9247D3">
                  {stat.label}
                </Typography>
                <Typography variant="h5" color="#53128C">
                  {stat.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <RequestTemplateDetails requestTemplate={dataRequestTemplate} />
        </Box>
      </Container>
      <Divider />
      <Container sx={{ pt: 4 }}>
        <Box sx={{ maxWidth: 896 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {explorerRequestTemplateDetailOverview.data_request}
          </Typography>
          <Stack direction="column" gap={2} mt={2} mb={3}>
            {dataRequestTemplate?.dataModels.map((dataModel: any) => (
              <RequestedData
                key={dataModel.id}
                dataModel={dataModel}
                raw={dataRequestTemplate}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
