'use client';

import Claims from '@/components/claims/claims';
import NumberCard from '@/components/number-card/number-card';
import { Explorer_Data_Model_Detail_OverviewQuery } from '@/services/protocol/types';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';
import { numberToMoneyString } from '@/utils/money';

import { Divider } from '@mui/material';
import { Stack } from '@mui/system';

import DataModelDetails from './details';
import DataModelDetailHeader from './header';

type Props = {
  dataModel: Explorer_Data_Model_Detail_OverviewQuery['dataModel'];
  isLoading: boolean;
};

export default function LearnMoreContent({ dataModel, isLoading }: Props) {
  const stats = [
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
        description={dataModel.description}
        tags={dataModel.tags!}
        isLoading={isLoading}
      />
      <Stack sx={{ pb: 3 }}>
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
      </Stack>
      <Divider sx={{ mx: NEGATIVE_CONTAINER_PX }} />
      <Stack sx={{ pt: 4 }}>
        <Claims schema={dataModel.schema} hasCopyButton={false} />
      </Stack>
    </>
  );
}
