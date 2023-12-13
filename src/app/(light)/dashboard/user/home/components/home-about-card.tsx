'use client';

import GatewayDarkBanner from '@/components/icons/gateway-dark-banner';
import { home } from '@/locale/en/home';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Link, Stack, Typography } from '@mui/material';

export default function HomeAboutCard() {
  return (
    <Box
      component={Link}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
      height="25%"
      padding={2}
      bgcolor="#771AC91F"
      borderRadius={1}
      href={home.main_banner.link}
      target="_blank"
      sx={{ textDecoration: 'none' }}
    >
      <GatewayDarkBanner
        sx={{
          width: 50,
          height: 54,
          justifySelf: 'flex-start',
        }}
      />
      <Stack
        justifyContent="space-between"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Stack>
          <Typography variant="h5" color="common.dark" gutterBottom>
            {home.main_banner.title}
          </Typography>
          <Typography variant="body2" color="common.dark" gutterBottom>
            {home.main_banner.subtitle}
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: 'common.dark',
            paddingX: 0.6,
            marginTop: { xs: 1, md: 4 },
          }}
        >
          {home.main_banner.btn_text}
          <OpenInNewIcon sx={{ ml: 0.8, height: 16, width: 16 }} />
        </Button>
      </Stack>
    </Box>
  );
}
