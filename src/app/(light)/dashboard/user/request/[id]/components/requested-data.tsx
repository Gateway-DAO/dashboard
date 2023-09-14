import Link from "next/link";

import { DataModel, DataRequest } from "@/services/protocol/types";
import { PartialDeep } from "type-fest";

import { Check } from "@mui/icons-material";
import { Card, CardActionArea, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

type Props = {
  dataModel: PartialDeep<DataModel>;
}

export default function RequestedData({ dataModel }: Props) {
  return <Stack direction="row" divider={<Divider orientation="vertical" sx={{ height: "unset" }} />} sx={{
    borderStyle: "solid", borderWidth: 1, borderColor: "divider", borderRadius: 1,
    overflow: "hidden"
  }} >
    <Card sx={{ flex: 1, borderRadius: 0 }} elevation={0}>
      <CardActionArea component={Link} sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        p: 2,
      }} href="#">
        <Typography component="span" fontWeight="bold">{dataModel.title}</Typography>
      </CardActionArea>
    </Card>
    <Table sx={{
      flex: 2, ".MuiTableCell-head": {
        fontWeight: "bold"
      },
      ".MuiTableCell-root:first-child": {
        borderRightStyle: "solid",
        borderRightWidth: 1,
        borderRightColor: "divider"
      },
      ".MuiTableRow-root:last-child .MuiTableCell-root": {
        borderBottom: 0
      }
    }}>
      <TableHead sx={{ borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: "divider" }}>
        <TableRow>
          <TableCell>Requested</TableCell>
          <TableCell>My Data</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Requested</TableCell>
          <TableCell>My Data</TableCell>
          <TableCell align="right"><Check color="success" /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Requested</TableCell>
          <TableCell>My Data</TableCell>
          <TableCell align="right"><Check color="success" /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Requested</TableCell>
          <TableCell>My Data</TableCell>
          <TableCell align="right"><Check color="success" /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Stack>
}
