import routes from '@/constants/routes';
import { explorerDataModelCard } from '@/locale/en/datamodel';
import { DataModel } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { PartialDeep } from 'type-fest';

import { Typography, CardProps, Box } from '@mui/material';

import ExplorerDataCard from '../data-card/data-card';

type Props = {
  withLink?: boolean;
  dataModel?: PartialDeep<DataModel>;
};

export default function DataModelExplorerCard({
  withLink = true,
  dataModel,
  ...props
}: Props & CardProps) {
  const profile = getOrganizationOrUserData(
    dataModel?.createdBy ?? {},
    dataModel?.organization
  );

  return (
    <ExplorerDataCard
      title={dataModel!.title!}
      description={dataModel!.description!}
      href={withLink ? routes.explorer.dataModel(dataModel!.id) : undefined}
      profile={profile}
      bottom={
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: '1fr 0.8fr',
          }}
        >
          {dataModel?.consumptionPrice ? (
            <Typography variant="subtitle2" fontWeight="400">
              <b>
                {dataModel?.consumptionPrice?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </b>{' '}
              {explorerDataModelCard.consumption}
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
            <b>
              {dataModel?.pdasIssuedCount
                ? dataModel.pdasIssuedCount.toLocaleString('en-US', {
                    notation: 'compact',
                  })
                : 0}
            </b>{' '}
            {explorerDataModelCard.issuances(dataModel?.pdasIssuedCount ?? 0)}
          </Typography>
        </Box>
      }
      {...props}
    />
  );
}
