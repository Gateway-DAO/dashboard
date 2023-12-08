import DataCard from '@/components/data-card/data-card';
import routes from '@/constants/routes';
import { explorerRequestTemplateCard } from '@/locale/en/request-template';
import { DataRequestTemplate } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { PartialDeep } from 'type-fest';

import { Typography, CardProps } from '@mui/material';

type Props = {
  withLink?: boolean;
  requestTemplate?: PartialDeep<DataRequestTemplate>;
};

export default function RequestTemplateExplorerCard({
  withLink = true,
  requestTemplate,
  ...props
}: Props & CardProps) {
  const profile = getOrganizationOrUserData(
    requestTemplate?.user ?? {},
    requestTemplate?.organization
  );

  // console.log('user', requestTemplate?.user);
  // console.log('org', requestTemplate?.organization);

  return (
    <DataCard
      title={profile!.name!}
      description={requestTemplate!.description!}
      href={
        withLink
          ? routes.explorer.requestTemplate(requestTemplate!.id)
          : undefined
      }
      profile={profile}
      bottom={
        requestTemplate?.dataRequestsCount ? (
          <Typography variant="subtitle2" fontWeight="400">
            <b>
              {requestTemplate?.dataRequestsCount?.toLocaleString('en-US', {
                notation: 'compact',
              })}
            </b>{' '}
            {explorerRequestTemplateCard.requests(
              requestTemplate.dataRequestsCount > 1
            )}
          </Typography>
        ) : undefined
      }
      {...props}
    />
  );
}
