import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack, Typography } from '@mui/material';

export function EditMetaInfo() {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={4}
    >
      <Stack>
        <Typography variant="h5" color={'primary.dark'}>
          acme
        </Typography>
        <Typography variant="caption" color={'primary.dark'}>
          did:gatewayid:0x02...626d6 <ContentCopyIcon fontSize="small" />
        </Typography>
      </Stack>
      <Stack>
        <Button variant="outlined">Edit</Button>
      </Stack>
    </Stack>
  );
}
