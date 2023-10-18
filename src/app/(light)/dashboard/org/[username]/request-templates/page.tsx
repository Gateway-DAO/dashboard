import { getPrivateApi } from '@/services/protocol/api';

import { Typography } from '@mui/material';

import RequestTemplatesTable from './components/request-templates-table';

export default async function DashboardOrgDataRequestTemplatesPage(props: any) {
  const privateApi = await getPrivateApi();
  const pathnameOrg = props.params?.username;

  const requestsData =
    (
      await privateApi.dataRequestTemplatesByOrg({
        orgCreatorId: pathnameOrg,
        skip: 0,
        take: 5,
      })
    )?.dataRequestTemplates ?? [];

  const count = (
    await privateApi.myDataRequestTemplatesCountOrg({
      orgGatewayId: pathnameOrg,
    })
  ).myDataRequestTemplatesCount;

  return (
    <>
      {requestsData && requestsData.length > 0 ? (
        <RequestTemplatesTable data={requestsData} totalCount={count} />
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          No data request templates yet
        </Typography>
      )}
    </>
  );
}
