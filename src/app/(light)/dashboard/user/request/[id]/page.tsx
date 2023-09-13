import Link from "next/link";

import RequestStatusChip from "@/components/requests/request-status-chip";
import ToggleCollapse from "@/components/toggle-collapse/toggle-collapse";
import { DATE_FORMAT } from "@/constants/date";
import routes from "@/constants/routes";
import { common } from "@/locale/en/common";
import { request } from "@/locale/en/request";
import { DataModel, DataRequest, DataResourceStatus } from "@/services/protocol/types";
import { NEGATIVE_CONTAINER_PX } from "@/theme/config/style-tokens";
import { PageProps } from "@/types/next";
import dayjs from "dayjs";
import { PartialDeep } from "type-fest";

import { Divider, Paper, Stack, Typography } from "@mui/material";

import RequestCard from "./components/request-card";
import RequestedData from "./components/requested-data";

const mockrequest: PartialDeep<DataRequest> = {
  id: "cr_3r8fn374f",
  createdAt: "2021-10-13T14:00:00.000Z",
  status: DataResourceStatus.Pending,
  userVerifier: {
    id: "1",
    gatewayId: "Chase"
  },
  dataRequestTemplate: {
    id: "crtmlp_ds34r3fg45",
  },
}

const requestedData = [{
  dataModel: {
    id: "123231",
    title: "Credit Card Transactions",
    schema: {
      type: "object",
      default: {},
      title: "Root Schema",
      required: [
        "age"
      ],
      properties: {
        age: {
          type: "integer",
          default: 0,
          title: "Your age",
          examples: [
            2
          ]
        },
        name: {
          type: "string",
          default: "name",
          title: "Your Name",
          examples: [
            "sanket"
          ]
        },
        socialsecuritynumber: {
          type: "integer",
          default: 0,
          title: "Social Security Number",
          examples: [
            29495858
          ]
        }
      }
    }
  } as PartialDeep<DataModel>,
}]

export default function DashboardUserDataRequest({ params: { id } }: PageProps<{ id: string }>) {
  return (
    <>
      <Typography variant="h3" component="h2" sx={{ mb: 6.5 }}>
        {id}
      </Typography>
      <Stack direction="column" gap={2}>
        <RequestCard requester={mockrequest.userVerifier!.gatewayId!} status={mockrequest.status!} proofId="" />
        <Paper component={Stack} divider={<Divider orientation="vertical" sx={{ height: "unset" }} />} direction="row" elevation={0}>
          <Stack gap={1} flex="1" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">{common.general.created_at}</Typography>
            <Typography>{dayjs(mockrequest.createdAt).format(DATE_FORMAT)}</Typography>
          </Stack>
          <Stack gap={1} flex="1" alignItems="flex-start" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">{common.general.status}</Typography>
            <RequestStatusChip status={mockrequest.status!} variant="filled" size="small" />
          </Stack>
        </Paper>
        <ToggleCollapse hiddenLabel={common.actions.more_info} visibleLabel={common.actions.less_info}>
          <Paper component={Stack} divider={<Divider orientation="vertical" sx={{ height: "unset" }} />} direction="row" elevation={0}>
            <Stack gap={1} flex="1" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">{request.label.request_id}</Typography>
              <Typography>{id}</Typography>
            </Stack>
            <Stack gap={1} flex="1" alignItems="flex-start" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">{request.label.request_template_id}</Typography>
              <Typography>{mockrequest.dataRequestTemplate?.id}</Typography>
            </Stack>
          </Paper>
        </ToggleCollapse>
        <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, mt: 2, mb: 4 }} />
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          {request.label.requested_data}
        </Typography>
        <Stack direction="column" gap={2}>
          {requestedData.map(({ dataModel }) => (<RequestedData key={dataModel.id} dataModel={dataModel} />))}
        </Stack>
      </Stack >
    </>
  )
}
