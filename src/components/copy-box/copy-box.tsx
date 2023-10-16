import { Box, Stack, Typography } from '@mui/material';

import CopyButton from '../copy-button/copy-button';

type Props = {
  title?: string;
  value: string;
};

export default function CopyBox({ title, value }: Props) {
  return (
    <Stack
      sx={{
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        flexDirection: 'row',
        p: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {title && (
          <Typography variant="caption" mb={1}>
            {title}
          </Typography>
        )}
        <Typography variant="body1">{value}</Typography>
      </Box>
      <CopyButton sx={{ border: 'none' }} text={value} />
    </Stack>
  );
}
