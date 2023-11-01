import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';
import { numberToMoneyString } from '@/utils/money';

import { Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';

import RequestTemplateDetails from './components/details/details';
import RequestTemplateDetailHeader from './components/header';

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
      value: numberToMoneyString(2044300),
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
        <Box sx={{ maxWidth: 896 }}>test</Box>
      </Container>
    </>
  );
}
