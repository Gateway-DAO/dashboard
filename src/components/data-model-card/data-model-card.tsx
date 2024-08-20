import { ReactNode } from 'react';

import DataCard from '@/components/data-card/data-card';

import { PartialDeep } from 'type-fest';

import { Typography, CardProps, Box } from '@mui/material';
import { DataModelType } from '@/services/api/mock-types';
import routes from '@/constants/routes';
import getOrganizationOrUserData from '@/utils/get-organization-or-use-data';

type Props = {
  withLink?: boolean;
  dataModel?: PartialDeep<DataModelType>;
  children?: ReactNode;
};

export default function DataModelCard({
  withLink = true,
  dataModel,
  children,
  ...props
}: Props & CardProps) {
  const profile = getOrganizationOrUserData();

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
            <Typography variant="subtitle2" fontWeight="400"></Typography>

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
