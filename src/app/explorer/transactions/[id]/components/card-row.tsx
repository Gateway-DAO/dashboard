import { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';

import { Box, Stack, Typography } from '@mui/material';

export default function CardRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <TableCellContainer>
      <CardCellContainer>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="flex-start"
          pb={1}
        >
          <Typography variant="subtitle1" flex={1}>
            {title}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            flex={2}
            gap={1}
          >
            {children}
          </Box>
        </Stack>
      </CardCellContainer>
    </TableCellContainer>
  );
}
