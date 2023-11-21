import DataImageCard from '@/components/data-image-card/data-image-card';
import routes from '@/constants/routes';
import { dataModelCard } from '@/locale/en/datamodel';
import { DataModel } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { numberToMoneyString } from '@/utils/money';
import { PartialDeep } from 'type-fest';

import { Typography, CardProps, Box, Stack, Button } from '@mui/material';

type Props = {
  dataModel?: PartialDeep<DataModel>;
};

export default function DataModelCard({
  dataModel,
  ...props
}: Props & CardProps) {
  const profile = getOrganizationOrUserData(
    dataModel?.createdBy ?? {},
    dataModel?.organization
  );

  return (
    <DataImageCard
      title={dataModel!.title!}
      description={dataModel!.description!}
      profile={profile}
      image={dataModel!.image as string}
      bottom={
        <>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: '1fr 0.8fr',
              mb: 3,
            }}
          >
            {dataModel?.consumptionPrice ? (
              <Typography variant="subtitle2" fontWeight="400">
                <b>{numberToMoneyString(dataModel?.consumptionPrice)}</b>{' '}
                {dataModelCard.consumption}
              </Typography>
            ) : (
              <span />
            )}
            <Typography
              variant="subtitle2"
              fontWeight="400"
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              <b>{numberToMoneyString(dataModel?.pdasIssuedCount ?? 0)}</b>{' '}
              {dataModelCard.issuances(dataModel?.pdasIssuedCount ?? 0)}
            </Typography>
          </Box>
          <Stack direction="row" gap={1}>
            <Button size="small" variant="contained">
              Issue
            </Button>
            <Button size="small" variant="outlined">
              Learn more
            </Button>
          </Stack>
        </>
      }
      {...props}
    />
  );
}
