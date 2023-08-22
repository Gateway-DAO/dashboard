import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Fragment } from 'react';

export type ColumnGrid = {
  header_name: string;
  // column_name: ColumnType;
  // field?: string;
  // cell?: (params: any) => ReactNode;
  // valueGetter?: (params: any) => any;
};

type Props = {
  columns: ColumnGrid[];
  data: {
    pages: any[];
  };
};

export function TableFilterSearch({ columns, data }: Props) {
  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.header_name}>
                  {column.header_name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.pages && data.pages.length > 0 && (
              <Fragment>
                {data.pages.map((page, index) => (
                    <Fragment key={`page-${index}`}>
                    {page.map((row, rowIndex) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {/* <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                    )}
                )}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
