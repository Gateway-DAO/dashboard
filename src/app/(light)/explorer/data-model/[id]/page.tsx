import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import { Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';

import NumberCard from '../../components/number-card/number-card';
import DataModelClaims from './components/claims/claims';
import DataModelDetails from './components/details/details';
import DataModelDetailHeader from './components/header';

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
              <NumberCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
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
