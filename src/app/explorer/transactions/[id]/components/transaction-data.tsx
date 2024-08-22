'use client';

import { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

export default function TransactionData({ data }: { data: string }) {
  const result = JSON.stringify(JSON.parse(data), null, 2);

  return (
    <Container sx={{ pb: 4 }}>
      <Box sx={{ maxWidth: 777 }}>
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
            <CardCellContainer>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Metadata</Typography>
              </Stack>
              <Box pt={2}>
                <SyntaxHighlighter language="json" style={dracula}>
                  {result}
                </SyntaxHighlighter>
              </Box>
            </CardCellContainer>
          </TableCellContainer>
        </Stack>
      </Box>
    </Container>
  );
}
