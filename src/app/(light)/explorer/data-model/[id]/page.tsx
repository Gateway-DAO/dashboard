import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import { Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';

import DataModelDetailHeader from './components/header';
import DataModelClaims from './components/claims/claims';
import DataModelDetails from './components/details/details';

export default async function DataModelPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } = await apiPublic.explorer_data_model_detail_overview({
    id,
  });

  const stats = [
    {
      label: 'Unique issuers',
      value: dataModel.uniqueIssuersCount,
    },
    {
      label: 'PDAs issued',
      value: dataModel.pdasIssuedCount,
    },
    {
      label: 'Tied request templates',
      value: 200,
    },
    {
      label: 'Revenue generated',
      value: Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(27453.45),
    },
  ];

  return (
    <>
      <DataModelDetailHeader
        id={dataModel.id}
        title={dataModel.title}
        tags={dataModel.tags!}
      />
      <Container sx={{ pb: 4 }}>
        <Box sx={{ maxWidth: 896 }}>
          <Typography color="text.secondary" whiteSpace="pre-wrap">
            {dataModel.description}
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
          <DataModelDetails dataModel={dataModel} />
        </Box>
      </Container>
      <Divider />
      <Container sx={{ pt: 4 }}>
        <Box sx={{ maxWidth: 896 }}>
          <DataModelClaims schema={dataModel.schema} />
        </Box>
      </Container>
    </>
  );
}
