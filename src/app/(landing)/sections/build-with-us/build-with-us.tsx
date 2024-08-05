import Image from 'next/image';
import Link from 'next/link';

import documentationRoutes from '@/constants/documentationRoutes';
import CTAImage from 'public/images/cta.png';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function BuildWithUs() {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
      }}
    >
      <Stack
        component={Container}
        sx={{
          display: 'flex',
          position: 'relative',
          zIndex: 1,
          color: 'white.main',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          pt: {
            xs: 6,
            md: 15,
          },
          pb: {
            xs: 35.25,
            md: 74,
          },
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          align="left"
          sx={{
            typography: {
              xs: 'h4',
              md: 'h3',
            },
            fontWeight: 'lighter!important',
            mb: 1,
            color: 'inherit',
            textAlign: {
              xs: 'left',
              md: 'center',
            },
            maxWidth: {
              sm: 'unset',
              md: 664,
            },
          }}
          gutterBottom
        >
          Build the User Sovereign Web with us
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontWeight: 'lighter!important',
            maxWidth: {
              sm: 480,
              md: 564,
            },
            mb: 4,
            color: 'inherit',
            textAlign: {
              xs: 'left',
              md: 'center',
            },
          }}
        >
          Unlock the full potential of user autonomy and consent in your app or
          service with Gateway’s middleware to drive your business goals.
        </Typography>
        <Button
          component={Link}
          href={documentationRoutes.home}
          target="_blank"
          variant="contained"
          color="white"
          size="large"
        >
          Read Documentation
        </Button>
      </Stack>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          inset: 0,
        }}
      >
        <Image
          src={CTAImage}
          alt="futuristic garden, with multiple buildings and people walking down the road"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center bottom',
          }}
        />
      </Box>
    </Box>
  );
}
