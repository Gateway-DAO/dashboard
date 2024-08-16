import { Box, Stack, Typography } from '@mui/material';

export default function FooterSubscription() {
  return (
    <Stack
      sx={{
        alignItems: {
          xs: 'flex-start',
          md: 'center',
        },
        pt: {
          xs: 0,
          md: 5,
        },
        pb: 5,
      }}
    >
      <Typography
        color="white.main"
        sx={{
          typography: {
            xs: 'h4',
            md: 'h3',
          },
          mb: 2,
        }}
      >
        Subscribe to our newsletter
      </Typography>
      <Typography
        color="white.main"
        sx={{
          mb: 5,
        }}
      >
        Receive news about developments and updates.
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: {
            xs: '100%',
            md: '440px',
          },
        }}
      >
        {process.env.NODE_ENV !== 'development' && (
          <div
            style={{
              height: '58px',
              width: '100%',
            }}
            dangerouslySetInnerHTML={{
              __html: `
            <script src="https://cdn.jsdelivr.net/ghost/signup-form@~0.1/umd/signup-form.min.js" data-button-color="#FFFFFF" data-button-text-color="#771AC9" data-site="https://gateway-1.ghost.io/" async style="display: block;"></script>`,
            }}
          ></div>
        )}
      </Box>
    </Stack>
  );
}
