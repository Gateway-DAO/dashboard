import { ReactNode } from 'react';

import DataCard from '@/components/data-card/data-card';
import routes from '@/constants/routes';
import { mockAccount } from '@/services/api/mocks';
import { DataModel } from '@/services/api/models';
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
  return (
    <DataCard
      title={dataModel!.title!}
      description={dataModel!.description!}
      href={withLink ? routes.explorer.dataModel(dataModel!.id) : undefined}
      profile={mockAccount}
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
