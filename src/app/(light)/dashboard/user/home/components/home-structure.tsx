'use client';

import { home } from '@/locale/en/home';

import { Box } from '@mui/material';
import { Button, Paper, Stack, Typography, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GatewayDarkBanner from '@/components/icons/gateway-dark-banner';
import GetIcon from './get-icon';

type Props = {
  username: string;
};

export default function HomeStructure({ username }: Props) {
  return (
    <>
      <Typography variant="h3" marginBottom={4} gutterBottom>
        {home.greeting} {username}
      </Typography>
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
          <div>
            <Typography variant="h5" color="common.dark" gutterBottom>
              {home.main_banner.title}
            </Typography>
            <Typography variant="body2" color="common.dark" gutterBottom>
              {home.main_banner.subtitle}
            </Typography>
          </div>
          <Link href={home.main_banner.link} target="_blank">
            <Button
              variant="outlined"
              size="medium"
              sx={{
                color: 'common.dark',
                paddingX: 1,
                marginTop: { xs: 1, md: 3 },
              }}
            >
              {home.main_banner.btn_text}
              <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
            </Button>
          </Link>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {home.sub_banner.map((details, index) => (
          <Paper
            key={index}
            variant="outlined"
            sx={{
              padding: 1.5,
              width: '342',
              mr: 3,
              marginTop: 2,
              textDecoration: 'none',
            }}
          >
            <Stack flexDirection={'column'} justifyContent={'space-between'}>
              <GetIcon index={index} sx={{ width: 50, height: 50, mb: 2 }} />
              <div>
                <Typography
                  sx={{ mt: { xs: 0, md: 10 } }}
                  variant="body2"
                  color="common.secondary"
                >
                  {details.heading}
                </Typography>
                <Typography mt={2} variant="h5" width={222} gutterBottom>
                  {details.title}
                </Typography>
                <Typography
                  variant="body2"
                  width={300}
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {details.subtitle}
                </Typography>
                <Link href={details.link} target={details.target}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ paddingX: 1, marginTop: 1 }}
                  >
                    {details.btn_text}
                    {details.target === '_blank' && (
                      <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
                    )}
                  </Button>
                </Link>
              </div>
            </Stack>
          </Paper>
        ))}
      </Box>
    </>
  );
}
