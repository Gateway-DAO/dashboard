import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material';

export function EditConnectedWallet() {
  return (
    <Stack
      width={591}
      height="auto"
      bgcolor={'white'}
      padding={2}
      borderRadius={1.2}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={4}
      >
        <Stack>
          <Typography variant="subtitle1">Connected wallet</Typography>
          <Typography variant="body2">
            Connected wallets to your Gateway ID
          </Typography>
        </Stack>
        <Stack>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <Typography variant="body1">
          5eFZRRRa74j9QZ7NnUoshpuLrPrWVgKJgXanLXX4ceYn
        </Typography>
        <Typography variant="caption">Solana</Typography>
      </Stack>
    </Stack>
  );
}
