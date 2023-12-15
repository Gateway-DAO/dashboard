'use client';
import { createPropertiesArray } from '@/app/(light)/app/(dashboard)/user/request/[id]/components/utils';
import ExternalLink from '@/components/external-link/external-link';
import routes from '@/constants/routes';
import { explorerRequestTemplateDetailOverview } from '@/locale/en/request-template';

import {
  Divider,
  Card,
  CardActionArea,
  Link,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
  dataModel: any;
  raw: any;
};

export default function RequestedData({ dataModel, raw }: Props) {
  const color = grey[50];
  const propertiesArray =
    createPropertiesArray(
      raw.schema.find(
        (dataModelSchema: any) => dataModelSchema.id === dataModel.id
      )
    ) || [];
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" sx={{ height: 'unset' }} />}
      sx={{
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <Card sx={{ flex: 1, borderRadius: 0 }} elevation={0}>
        <CardActionArea
          component={Link}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            p: 2,
          }}
          href="#"
        >
          <Typography component="span" fontWeight="bold">
            {dataModel?.title}
          </Typography>
          <ExternalLink
            href={routes.explorer.dataModel(dataModel?.id)}
            text={explorerRequestTemplateDetailOverview.see_data_model}
          />
        </CardActionArea>
      </Card>
      <Table
        sx={{
          backgroundColor: color,
          flex: 2,
          '.MuiTableCell-head': {
            fontWeight: 'bold',
          },
          '.MuiTableCell-root:first-child': {
            borderRightStyle: 'solid',
            borderRightWidth: 1,
            borderRightColor: 'divider',
          },
          '.MuiTableRow-root:last-child .MuiTableCell-root': {
            borderBottom: 0,
          },
        }}
      >
        <TableHead id="learn-more-request-data-table__anchor">
          <TableRow>
            <TableCell>
              {explorerRequestTemplateDetailOverview.request}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: '50%' }}>
              <Stack
                divider={<Divider sx={{ mx: { xs: -1, lg: -2 }, my: 2 }} />}
              >
                {propertiesArray?.map((property: any, index: number) => (
                  <Stack key={index}>
                    <Typography variant="subtitle2">
                      {property.title ?? property.propertyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.type}{' '}
                      {property.validations ? `/ ${property.validations}` : ''}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
}
