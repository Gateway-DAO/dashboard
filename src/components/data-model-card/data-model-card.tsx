import { ReactNode } from 'react';

import DataCard from '@/components/data-card/data-card';

import { PartialDeep } from 'type-fest';

import { Typography, CardProps, Box } from '@mui/material';
import { DataModelType, mockUser } from '@/services/api/mock-types';
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
  return (
    <DataCard
      title={dataModel!.title!}
      description={dataModel!.description!}
      href={withLink ? routes.explorer.dataModel(dataModel!.id) : undefined}
      profile={mockUser}
      sx={{ minWidth: 300 }}
      bottom={
        <>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: '1fr 0.8fr',
            }}
          >
            <Typography variant="subtitle2" fontWeight="400" justifySelf="left">
              <b>
                {dataModel?.dataAssests
                  ? dataModel.dataAssests.toLocaleString('en-US', {
                      notation: 'compact',
                    })
                  : 0}
              </b>{' '}
              data assets
            </Typography>
          </Box>
          {children}
        </>
      }
      {...props}
    />
  );
}
