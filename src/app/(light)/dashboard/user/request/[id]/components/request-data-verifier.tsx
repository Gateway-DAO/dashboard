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

import { createPropertiesArray } from './utils';

type Props = {
  dataModel: any;
};

export default function RequestDataVerifierView({ dataModel }: Props) {
  const propertiesArray = createPropertiesArray(dataModel) || [];
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
          //   backgroundColor: 'common.white',
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
      </Table>
    </Stack>
  );
}
