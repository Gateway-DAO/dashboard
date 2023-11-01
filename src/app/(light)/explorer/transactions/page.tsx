import { Box, Stack, Typography } from '@mui/material';

import ExplorerHero from '../components/hero/hero';

export default function Transaction() {
  return (
    <ExplorerHero
      title="Transactions"
      sx={{
        backgroundColor: 'primary.light',
      }}
    />
    // <Stack>
    //   <Typography variant="h2">Transactions</Typography>
    //   <Stack>
    //     <Box>
    //       <Typography variant="subtitle1">Transactions</Typography>
    //       <Typography variant="h5">88043405</Typography>
    //     </Box>
    //   </Stack>
    // </Stack>
  );
}
