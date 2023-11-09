import { common } from '@/locale/en/common';

import { Button, Stack, TextField, Typography } from '@mui/material';

export default function Newsletter() {
  return (
    <Stack direction="column" gap={1} flexGrow={1}>
      <Typography variant="body1" fontWeight="700" sx={{ mb: 1 }}>
        {common.newsletter.title}
      </Typography>
      <Typography>{common.newsletter.subtitle}</Typography>
      <TextField
        placeholder={common.newsletter.label}
        label={common.newsletter.label}
        sx={{ mb: 1 }}
      ></TextField>
      <Button
        type="button"
        variant="contained"
        sx={{ alignSelf: 'flex-start' }}
        size="large"
      >
        {common.actions.subscribe}
      </Button>
    </Stack>
  );
}
