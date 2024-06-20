'use client';

import { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyButton from '@/components/copy-button/copy-button';
import { transaction_detail } from '@/locale/en/transaction';
import { useToggle } from '@react-hookz/web';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Box,
  Card,
  Collapse,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

export default function TransactionData({ data }: { data: string }) {
  const [displayData, toggleData] = useToggle(false);

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
                <Typography variant="subtitle1">
                  {transaction_detail.transaction_data}
                </Typography>
                <Box>
                  <CopyButton variant="text" text={result} />
                  <IconButton size="small" onClick={toggleData}>
                    {displayData ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </Box>
              </Stack>
              <Collapse in={displayData}>
                <Box pt={2}>
                  <SyntaxHighlighter language="json" style={dracula}>
                    {result}
                  </SyntaxHighlighter>
                </Box>
              </Collapse>
            </CardCellContainer>
          </TableCellContainer>
        </Stack>
      </Box>
    </Container>
  );
}
