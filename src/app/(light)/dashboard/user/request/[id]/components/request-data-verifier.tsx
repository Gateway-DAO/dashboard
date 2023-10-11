import { DataResourceStatus } from '@/services/protocol/types';

import { Check } from '@mui/icons-material';
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

import { createPropertiesArray } from './utils';
import ViewDataByType from './view-data-by-type';

type Props = {
  dataModel: any;
  raw?: any;
  status: DataResourceStatus;
};

export default function RequestDataVerifierView({
  dataModel,
  raw,
  status,
}: Props) {
  const propertiesArray = createPropertiesArray(dataModel) || [];

  const color = grey[50];

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
            {dataModel.title}
          </Typography>
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
        {status === DataResourceStatus.Accepted && raw ? (
          <>
            <TableHead id="learn-more-request-data-table__anchor">
              <TableRow>
                <TableCell>Requested</TableCell>
                <TableCell>User data</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propertiesArray.map((property, index) => {
                const currentProperty =
                  raw[dataModel.id]?.[Object.keys(raw[dataModel.id])[0]]
                    ?.claim?.[property.propertyName];
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ width: '50%' }}>
                      <Typography variant="subtitle2">
                        {property.title ?? property.propertyName}
                      </Typography>
                      <Typography variant="body2">
                        {property.type} / {property.validations}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: '45%' }}>
                      <ViewDataByType
                        propertyType={property.type}
                        currentProperties={currentProperty}
                      />
                    </TableCell>
                    <TableCell sx={{ width: '5%' }} align="right">
                      <Check color="success" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          <>
            <TableHead id="learn-more-request-data-table__anchor">
              <TableRow>
                <TableCell>Requested</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propertiesArray.map((property, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {property.title ?? property.propertyName}
                    </Typography>
                    <Typography variant="body2">
                      {property.type} / {property.validations}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </Stack>
  );
}
