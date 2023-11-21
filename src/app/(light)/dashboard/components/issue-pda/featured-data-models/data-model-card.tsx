import DataImageCard from '@/components/data-image-card/data-image-card';
import routes from '@/constants/routes';
import { dataModelCard } from '@/locale/en/datamodel';
import { DataModel } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { numberToMoneyString } from '@/utils/money';
import { PartialDeep } from 'type-fest';

import { Typography, CardProps, Box } from '@mui/material';

type Props = {
  withLink?: boolean;
  dataModel?: PartialDeep<DataModel>;
  image: string;
};

export default function DataModelCard({
  withLink = true,
  dataModel,
  image,
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
      href={withLink ? routes.explorer.dataModel(dataModel!.id) : undefined}
      profile={profile}
      image={image}
      bottom={
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: '1fr 0.6fr',
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
      }
      {...props}
    />
  );
}
