import { PartialDeep } from 'type-fest/source/partial-deep';

import {
  Stack,
  Paper,
  Typography,
  alpha,
  Divider,
  List,
  ListItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import getClaimType, { ClaimFieldProps } from '@/utils/get-claim-type';
import { CredentialData } from '@/services/protocol/types';
import ChipInputType from '@/components/chip-input-type/chip-input-type';
import Row from './row';

type Props = {
  properties: Record<string, ClaimFieldProps>;
};

export default function TableSchema({ properties }: Props) {
  const hasExamples = Object.keys(properties).some(
    (item) => (properties[item].examples ?? []).length > 0
  );
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {hasExamples && <TableCell sx={{ width: 72, p: 0 }} />}
            <TableCell sx={{ color: 'text.secondary' }}>Field</TableCell>
            <TableCell sx={{ color: 'text.secondary' }} align="right">
              Type
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(properties).map((item) => (
            <Row property={properties[item]} showCollapse={hasExamples} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // return (
  //   <Paper
  //     elevation={0}
  //     component={Stack}
  //     sx={{
  //       border: 1,
  //       borderColor: 'divider',
  //       borderRadius: 1,
  //       mb: 2,
  //     }}
  //   >
  //     <ListItem
  //       component="div"
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Typography color="">Field</Typography>
  //       <Typography>Type</Typography>
  //     </ListItem>
  //     <Stack component={List} divider={<Divider />} sx={{ p: 0 }}>
  //       {Object.keys(properties)?.map((item, index) => {
  //         const itemType = properties[item];
  //         return (
  //           <>
  //             <ListItem>{JSON.stringify(itemType)}</ListItem>
  //           </>
  //         );
  //       })}
  //       {/* {data &&
  //         Object.keys(data)?.map((item, index) => {
  //           const itemType = data[item as ClaimType];
  //           return (
  //           <Stack
  //             key={index}
  //             direction="row"
  //             justifyContent="space-between"
  //             alignItems="center"
  //           >
  //             <CardCell label={data[item].title} margin={false} py={3}>
  //               {data[item].description}
  //             </CardCell>
  //             <Stack sx={{ mr: 2, my: 2 }}>
  //               <ChipInputType
  //                 type={getClaimType({
  //                   type: data[item]?.type,
  //                   contentMediaType: data[item]?.contentMediaType,
  //                   format: data[item]?.format,
  //                 })}
  //               />
  //             </Stack>
  //           </Stack>
  //         )})} */}
  //     </Stack>
  //   </Paper>
  // );
}
