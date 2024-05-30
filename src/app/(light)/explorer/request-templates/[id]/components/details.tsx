import CardCell, { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyButton from '@/components/copy-button/copy-button';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { explorerRequestTemplateDetailOverview } from '@/locale/en/request-template';
import { Explorer_Request_Template_Detail_OverviewQuery } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Card, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  requestTemplate: PartialDeep<
    Explorer_Request_Template_Detail_OverviewQuery['dataRequestTemplate']
  >;
};

export default function DataModelDetails({ requestTemplate }: Props) {
  const createdBy = getOrganizationOrUserData(
    requestTemplate!.user!,
    requestTemplate!.organization
  );

  return (
    <Stack
      component={Card}
      variant="outlined"
      sx={{
        mb: 3,
        overflow: 'visible',
      }}
      divider={
        <Divider
          sx={{
            width: '100%',
          }}
        />
      }
    >
      <TableCellContainer>
        <CardCellContainer direction="row" alignItems="center" gap={2}>
          <GTWAvatar
            src={createdBy.image}
            name={createdBy.name ?? createdBy.username}
          />
          <Stack direction="column">
            <Typography variant="caption" color="text.secondary">
              {common.general.created_by}
            </Typography>
            <Typography>
              <b>{createdBy.name ?? createdBy.username}</b>
            </Typography>
          </Stack>
        </CardCellContainer>
        <CardCell
          label={explorerRequestTemplateDetailOverview.labels.signed_by}
          margin={false}
        >
          <Typography>
            <b>
              {requestTemplate?.user?.displayName ??
                requestTemplate?.user?.gatewayId}
            </b>
          </Typography>
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell
          label={explorerRequestTemplateDetailOverview.labels.creation_date}
        >
          <Typography>
            {dayjs(requestTemplate?.createdAt).format(DATE_FORMAT)}
          </Typography>
        </CardCell>
        <CardCell
          label={explorerRequestTemplateDetailOverview.labels.last_update}
        >
          <Typography>
            {dayjs(requestTemplate?.createdAt).format(DATE_FORMAT)}
          </Typography>
        </CardCell>
        {/* Backlogged */}
        {/* <CardCell
          label={
            explorerRequestTemplateDetailOverview.labels.average_request_cost
          }
        >
          <Typography>{numberToMoneyString(0)}</Typography>
        </CardCell> */}
      </TableCellContainer>
      <TableCellContainer>
        <Stack
          gap={1}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          pr={2}
          width="100%"
        >
          <CardCell
            label={
              explorerRequestTemplateDetailOverview.labels
                .data_request_template_id
            }
          >
            <Typography>
              {limitCharsCentered(requestTemplate?.id as string, 8)}
            </Typography>
          </CardCell>
          <CopyButton size="small" variant="text" text={requestTemplate!.id!} />
        </Stack>
      </TableCellContainer>
    </Stack>
  );
}
