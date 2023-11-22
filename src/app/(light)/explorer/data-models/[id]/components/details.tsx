import CardCell, { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyButton from '@/components/copy-button/copy-button';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Profiles from '@/components/profiles/profiles';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { explorerDataModelDetailOverview } from '@/locale/en/datamodel';
import {
  Explorer_Data_Model_Detail_OverviewQuery,
  PermissionType,
} from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Card, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  dataModel: PartialDeep<Explorer_Data_Model_Detail_OverviewQuery['dataModel']>;
};

export default function DataModelDetails({ dataModel }: Props) {
  const createdBy = getOrganizationOrUserData(
    dataModel.createdBy!,
    dataModel.organization
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
            name={createdBy.name ?? createdBy.gatewayId}
          />
          <Stack direction="column">
            <Typography variant="caption" color="text.secondary">
              {common.general.created_by}
            </Typography>
            <Typography>
              <b>{createdBy.name ?? createdBy.gatewayId}</b>
            </Typography>
          </Stack>
        </CardCellContainer>
        <CardCell
          label={explorerDataModelDetailOverview.labels.signed_by}
          margin={false}
        >
          <Typography>
            <b>
              {dataModel.createdBy?.displayName ??
                dataModel.createdBy?.gatewayId}
            </b>
          </Typography>
        </CardCell>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell label={explorerDataModelDetailOverview.labels.creation_date}>
          <Typography>
            {dayjs(dataModel.createdAt).format(DATE_FORMAT)}
          </Typography>
        </CardCell>
        <CardCell
          label={explorerDataModelDetailOverview.labels.pda_comsumption_cost}
        >
          <Typography>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(dataModel.consumptionPrice ?? 0)}
          </Typography>
        </CardCell>
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
            label={explorerDataModelDetailOverview.labels.data_model_id}
          >
            <Typography>{dataModel.id}</Typography>
          </CardCell>
          <CopyButton size="small" variant="text" text={dataModel.id!} />
        </Stack>
      </TableCellContainer>
      <TableCellContainer>
        <CardCell
          label={explorerDataModelDetailOverview.labels.allowed_to_issue}
        >
          <Typography>
            {
              explorerDataModelDetailOverview.permissions[
                dataModel.permissioning!
              ]
            }
          </Typography>
          {dataModel.permissioning === PermissionType.SpecificIds && (
            <Profiles dataModel={dataModel} />
          )}
        </CardCell>
      </TableCellContainer>
    </Stack>
  );
}
