'use client';

import Claims from '@/components/claims/claims';
import NumberCard from '@/components/number-card/number-card';
import { Explorer_Data_Model_Detail_OverviewQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';

import { Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';

import DataModelDetails from './details';
import DataModelDetailHeader from './header';

type Props = {
  dataModel: Explorer_Data_Model_Detail_OverviewQuery['dataModel'];
};

export default function DataModelContent({ dataModel }: Props) {
  const stats = [
    {
      label: 'Unique Data Contributors',
      value: dataModel.uniqueIssuersCount,
    },
    {
      label: 'PDAs issued',
      value: dataModel.pdasIssuedCount,
    },
    {
      label: 'Revenue generated',
      value: numberToMoneyString(dataModel.revenueGenerated),
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
          <Claims schema={dataModel.schema} />
        </Box>
      </Container>
    </>
  );
}
