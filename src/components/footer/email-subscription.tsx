import { Box, Stack, Typography } from '@mui/material';

export default function EmailSubscription() {
  return (
    <Stack>
      <Typography variant="subtitle1">Subscribe to our newsletter</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Receive news about developments and updates.
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <div
          style={{
            minHeight: '58px',
            maxWidth: '440px',
            width: '100%',
          }}
          dangerouslySetInnerHTML={{
            __html: `
            <script src="https://cdn.jsdelivr.net/ghost/signup-form@~0.1/umd/signup-form.min.js" data-button-color="#771AC9" data-button-text-color="#FFFFFF" data-site="https://gateway-1.ghost.io/" async style="display: block;"></script>`,
          }}
        ></div>
      </Box>
    </Stack>
  );
}
