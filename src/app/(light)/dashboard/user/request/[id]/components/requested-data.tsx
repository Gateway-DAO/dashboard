import Link from 'next/link';

import { Check, Close } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

type Props = {
  dataModel: any;
  validDataProvided: any;
};

export default function RequestedData({ dataModel, validDataProvided }: Props) {
  // Function to translate claimValidations into a object easy to run and read
  const propertiesArray = [];
  for (const propertyName in dataModel.claimValidations?.properties) {
    const propertyObj = dataModel.claimValidations?.properties[propertyName];
    const validations = Object.keys(propertyObj)
      .filter((key) => key !== 'type' && key !== 'title')
      .map((key) => `${key} ${propertyObj[key]}`)
      .join(', ');

    propertiesArray.push({
      propertyName,
      title: dataModel.schema?.properties?.[propertyName]?.title,
      type: propertyObj.type,
      validations,
    });
  }

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
          backgroundColor: 'common.white',
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
            <TableCell>My Data</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {propertiesArray.map((property, index) => (
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
                {property.type === 'array' &&
                validDataProvided.validData[0]?.provided?.[
                  property.propertyName
                ] ? (
                  <>
                    {validDataProvided.validData[0]?.provided?.[
                      property.propertyName
                    ].map((item: any, index: number) => (
                      <Typography variant="body2" key={index}>
                        {item}
                      </Typography>
                    ))}
                  </>
                ) : (
                  <>
                    {validDataProvided.validData[0]?.provided?.[
                      property.propertyName
                    ] ? (
                      <>
                        {
                          validDataProvided.validData[0]?.provided?.[
                            property.propertyName
                          ]
                        }
                      </>
                    ) : (
                      <Typography color="error">
                        It doesn't met the criteria
                      </Typography>
                    )}
                  </>
                )}
              </TableCell>
              <TableCell sx={{ width: '5%' }} align="right">
                {!!validDataProvided.validData[0] ? (
                  <Check color="success" />
                ) : (
                  <Close color="error" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}
