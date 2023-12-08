import { ReactNode } from 'react';

import DataCard from '@/components/data-card/data-card';
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
  children?: ReactNode;
};

export default function DataModelCard({
  withLink = true,
  dataModel,
  children,
  ...props
}: Props & CardProps) {
  const profile = getOrganizationOrUserData(
    dataModel?.createdBy ?? {},
    dataModel?.organization
  );

  return (
    <DataCard
      title={dataModel!.title!}
      description={dataModel!.description!}
      href={withLink ? routes.explorer.dataModel(dataModel!.id) : undefined}
      profile={profile}
      bottom={
        <>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: '1fr 0.8fr',
            }}
          >
            <Typography variant="subtitle2" fontWeight="400">
              <b>{numberToMoneyString(dataModel?.consumptionPrice ?? 0)}</b>{' '}
              {dataModelCard.consumption}
            </Typography>

            <Typography
              variant="subtitle2"
              fontWeight="400"
              alignSelf="flex-end"
              justifySelf="flex-end"
            >
              <b>
                {dataModel?.pdasIssuedCount
                  ? dataModel.pdasIssuedCount.toLocaleString('en-US', {
                      notation: 'compact',
                    })
                  : 0}
              </b>{' '}
              {dataModelCard.issuances(dataModel?.pdasIssuedCount ?? 0)}
            </Typography>
          </Box>
          {children}
        </>
      }
      {...props}
    />
  );
}
