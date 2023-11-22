import CardCell, { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Profiles from '@/components/profiles/profiles';
import ToggleDropIcon from '@/components/toggle-drop-icon/toggle-drop-icon';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { explorerDataModelDetailOverview } from '@/locale/en/datamodel';
import {
  Explorer_Data_Model_Detail_OverviewQuery,
  PermissionType,
} from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { numberToMoneyString } from '@/utils/money';
import { useToggle } from '@react-hookz/web';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Button, Card, Collapse, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  dataModel: PartialDeep<Explorer_Data_Model_Detail_OverviewQuery['dataModel']>;
};

export default function DataModelDetails({ dataModel }: Props) {
  const [isShowing, toggleShowing] = useToggle(false);
  const createdBy = getOrganizationOrUserData(
    dataModel.createdBy!,
    dataModel.organization
  );

  return (
    <>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          overflow: 'visible',
        }}
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
            label={explorerDataModelDetailOverview.labels.pda_comsumption_cost}
          >
            <Typography>
              {numberToMoneyString(dataModel.consumptionPrice ?? 0)}
            </Typography>
          </CardCell>
        </TableCellContainer>
        <Collapse in={isShowing}>
          <Divider
            sx={{
              width: '100%',
            }}
          />
          <TableCellContainer>
            <CardCell
              label={explorerDataModelDetailOverview.labels.creation_date}
            >
              <Typography>
                {dayjs(dataModel.createdAt).format(DATE_FORMAT)}
              </Typography>
            </CardCell>
          </TableCellContainer>
          <Divider
            sx={{
              width: '100%',
            }}
          />
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
        </Collapse>
      </Stack>
      <Button
        onClick={toggleShowing}
        endIcon={<ToggleDropIcon active={isShowing} />}
        sx={{ mt: 2, mb: 2 }}
      >
        {common.general.show_more}
      </Button>
    </>
  );
}
