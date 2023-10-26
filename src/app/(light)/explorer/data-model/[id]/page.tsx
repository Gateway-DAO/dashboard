import CardCell, { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyButton from '@/components/copy-button/copy-button';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DATE_FORMAT } from '@/constants/date';
import { common } from '@/locale/en/common';
import { explorerDataModelDetailOverview } from '@/locale/en/datamodel';
import { pda } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';
import getCreatedBy from '@/utils/get-created-by';
import dayjs from 'dayjs';

import { Card, Divider, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';

import DataModelDetailHeader from './components/header';

export default async function DataModelPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } = await apiPublic.explorer_data_model_detail_overview({
    id,
  });

  const stats = [
    {
      label: 'Unique issuers',
      value: dataModel.uniqueIssuersCount,
    },
    {
      label: 'PDAs issued',
      value: dataModel.pdasIssuedCount,
    },
    {
      label: 'Tied request templates',
      value: 200,
    },
    {
      label: 'Revenue generated',
      value: Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(27453.45),
    },
  ];

  const createdBy = getCreatedBy(dataModel.createdBy!, dataModel.organization);

  return (
    <>
      <DataModelDetailHeader dataModel={dataModel} />
      <Container sx={{ pb: 4 }}>
        <Box sx={{ maxWidth: 896 }}>
          <Typography color="text.secondary" whiteSpace="pre-wrap">
            {dataModel.description}
          </Typography>
          <Stack
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            gap={1}
            sx={{ mt: 4, mb: 3 }}
          >
            {stats.map((stat) => (
              <Stack
                key={stat.label}
                gap={2}
                justifyContent="space-between"
                sx={{
                  backgroundColor: 'primary.light',
                  p: 2,
                  borderRadius: 1,
                  flex: 1,
                }}
              >
                <Typography variant="subtitle1" color="#9247D3">
                  {stat.label}
                </Typography>
                <Typography variant="h5" color="#53128C">
                  {stat.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack
            component={Card}
            variant="outlined"
            sx={{ mb: 3, overflow: 'visible' }}
            divider={<Divider sx={{ width: '100%' }} />}
          >
            <TableCellContainer>
              <CardCellContainer direction="row" alignItems="center">
                <GTWAvatar
                  src={createdBy.image}
                  name={createdBy.name ?? createdBy.gatewayId}
                />
                <Stack gap={1} direction="column">
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
              <CardCell
                label={explorerDataModelDetailOverview.labels.creation_date}
              >
                <Typography>
                  {dayjs(dataModel.createdAt).format(DATE_FORMAT)}
                </Typography>
              </CardCell>
              <CardCell
                label={
                  explorerDataModelDetailOverview.labels.pda_comsumption_cost
                }
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
                <CopyButton size="small" variant="text" text={dataModel.id} />
              </Stack>
            </TableCellContainer>
          </Stack>
        </Box>
      </Container>
      <Divider />
      <Container sx={{ pt: 4 }}>
        <Box sx={{ maxWidth: 896 }}>
          <Stack
            alignItems="center"
            gap={2}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">{pda.claim}</Typography>
            <CopyButton
              size="small"
              variant="text"
              customButtonText={
                explorerDataModelDetailOverview.actions.copy_claim_structure
              }
              text={JSON.stringify(dataModel.schema, null, 2)}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
