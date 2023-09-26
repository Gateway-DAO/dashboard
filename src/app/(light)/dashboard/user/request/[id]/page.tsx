import { Metadata } from 'next';
import { Session } from 'next-auth';

import PermissionError from '@/components/permission-error/permission-error';
import RequestStatusChip from '@/components/requests/request-status-chip';
import ToggleCollapse from '@/components/toggle-collapse/toggle-collapse';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { request } from '@/locale/en/request';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import {
  DataRequestQuery,
  DataResourceStatus,
  ProofQuery,
} from '@/services/protocol/types';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';
import { PageProps } from '@/types/next';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Divider, Paper, Stack, Typography } from '@mui/material';

import RequestCard from './components/request-card';
import RequestCardVerfierView from './components/request-card-verifier';
import RequestDataTable from './components/request-data-table';
import RequestDataTableVerifierView from './components/request-data-table-verifier';

const getDataRequest = async (
  id: string
): Promise<PartialDeep<DataRequestQuery['dataRequest']> | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const dataRequest = (await privateApi.dataRequest({ id }))?.dataRequest;
  return dataRequest;
};

const getRequestValidData = async (requestId: string) => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const requestValidData = (
    await privateApi.dataRequestValidData({ requestId })
  )?.findValidPDAsForRequest;
  return requestValidData;
};

const getProofData = async (
  proofId: string
): Promise<PartialDeep<ProofQuery['proof']> | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const proof = (await privateApi.proof({ id: proofId })).proof;
  return proof;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const dataRequest = await getDataRequest(params.id);

  return {
    title: `${dataRequest?.id} Data Request - Gateway Network`,
    description: dataRequest?.dataUse,
  };
}

export default async function DashboardUserDataRequest({
  params: { id },
}: PageProps<{ id: string }>) {
  const session = (await getGtwServerSession()) as Session;
  const userId = session.user.id;
  const dataRequest = await getDataRequest(id);

  if (!dataRequest || !dataRequest.id) {
    return <h1>Error</h1>;
  }

  if (
    userId !== dataRequest?.userRecipient?.id &&
    userId !== dataRequest?.userVerifier?.id
  ) {
    return <PermissionError />;
  }

  const isOwner = userId === dataRequest?.userRecipient?.id;
  const requestValidData = isOwner ? await getRequestValidData(id) : null;
  const proofData =
    isOwner ||
    dataRequest.status !== DataResourceStatus.Accepted ||
    !dataRequest.proofs?.[0]?.id
      ? {}
      : await getProofData(dataRequest.proofs?.[0]?.id);

  const requester =
    dataRequest.userVerifier?.displayName ??
    dataRequest.userVerifier?.gatewayId ??
    limitCharsCentered(dataRequest.userVerifier?.id as string, 15) ??
    '';
  const recipient =
    dataRequest.userRecipient?.displayName ??
    dataRequest.userRecipient?.gatewayId ??
    limitCharsCentered(dataRequest.userRecipient?.id as string, 15) ??
    '';

  return (
    <>
      <Typography variant="h3" component="h2" sx={{ mb: 6.5 }}>
        {id}
      </Typography>
      <Stack direction="column" gap={2}>
        {!!isOwner ? (
          <RequestCard
            requester={requester}
            status={dataRequest.status!}
            requestId={dataRequest.id}
            proofId={dataRequest.proofs?.[0]?.id}
            requestValidData={requestValidData}
            profilePicture={dataRequest.userVerifier?.profilePicture}
          />
        ) : (
          <RequestCardVerfierView
            recipient={recipient}
            status={dataRequest.status!}
            proofId={dataRequest.proofs?.[0]?.id}
          />
        )}
        <Paper
          component={Stack}
          divider={<Divider orientation="vertical" sx={{ height: 'unset' }} />}
          direction="row"
          elevation={0}
        >
          <Stack gap={1} flex="1" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {common.general.created_at}
            </Typography>
            <Typography>
              {dayjs(dataRequest.createdAt).format(DATE_FORMAT)}
            </Typography>
          </Stack>
          <Stack gap={1} flex="1" alignItems="flex-start" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {common.general.status}
            </Typography>
            <RequestStatusChip
              status={dataRequest.status!}
              variant="filled"
              size="small"
            />
          </Stack>
        </Paper>
        <ToggleCollapse
          hiddenLabel={common.actions.more_info}
          visibleLabel={common.actions.less_info}
        >
          <Paper
            component={Stack}
            divider={
              <Divider orientation="vertical" sx={{ height: 'unset' }} />
            }
            direction="row"
            elevation={0}
          >
            <Stack gap={1} flex="1" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {request.label.request_id}
              </Typography>
              <Typography>{id}</Typography>
            </Stack>
            <Stack gap={1} flex="1" alignItems="flex-start" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {request.label.request_template_id}
              </Typography>
              <Typography>{dataRequest.dataRequestTemplate?.id}</Typography>
            </Stack>
          </Paper>
        </ToggleCollapse>
        <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, mt: 2, mb: 4 }} />
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          {request.label.requested_data}
        </Typography>
        <Typography variant="body1" mb={1}>
          {dataRequest.dataUse}
        </Typography>
        {isOwner ? (
          <RequestDataTable
            schema={dataRequest.dataRequestTemplate?.schema}
            validData={requestValidData}
            dataModels={dataRequest.dataRequestTemplate?.dataModels || []}
          />
        ) : (
          <RequestDataTableVerifierView
            schema={dataRequest.dataRequestTemplate?.schema}
            dataModels={dataRequest.dataRequestTemplate?.dataModels || []}
            status={dataRequest.status!}
            raw={proofData?.data?.raw}
          />
        )}
      </Stack>
    </>
  );
}
