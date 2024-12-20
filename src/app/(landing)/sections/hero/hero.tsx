import Image from 'next/image';
import Link from 'next/link';

import documentationRoutes from '@/constants/documentationRoutes';
import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import HeroClientsSlider from './clients-slider';

import HeroImage from '/public/images/hero.png';

export default function Hero() {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        backgroundColor: 'primary.main',
        ...LANDING_NAVBAR_HEIGHT,
        pb: {
          xs: 5.5,
          sm: 9.75,
        },
      }}
    >
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: 16,
          color: 'white.main',
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          align="left"
          sx={{
            typography: {
              xs: 'h3',
              md: 'h1',
            },
            fontWeight: 'lighter!important',
            maxWidth: {
              xs: 400,
              sm: 500,
              md: 1200,
            },
            mb: 1,
            color: 'inherit',
          }}
          gutterBottom
        >
          The first chain to unify public and encrypted state
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{
            typography: {
              xs: 'body1',
              md: 'h6',
            },
            fontWeight: 'lighter!important',
            maxWidth: {
              sm: 480,
              md: 564,
            },
            mb: 4,
            color: 'inherit',
          }}
        >
          Gateway’s layer 1 blockchain brings programmable cryptography to
          developers. Unifying the execution of encrypted, sensitive data and
          public state information.
        </Typography>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          gap={2}
          sx={{
            mb: {
              xs: 5,
              sm: 9,
            },
          }}
        >
          <Button
            component={Link}
            href={documentationRoutes.home}
            target="_blank"
            variant="contained"
            color="white"
            size="large"
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            Read Documentation
          </Button>
          <Button
            component={Link}
            href="/blog/introducing-gateway-the-decentralized-private-computer"
            target="_blank"
            variant="outlined"
            color="white"
            size="large"
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
            Read Vision Paper
          </Button>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            opacity: 0.7,
            fontWeight: 'lighter',
            pb: 5,
            color: 'inherit',
          }}
        >
          Trusted by
        </Typography>
      </Container>
      <Box sx={{ minHeight: 47 }}>
        <HeroClientsSlider />
      </Box>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <Image
          src={HeroImage}
          alt="futuristic desertic landscape of a city, with multiple buildings, roads and the moon on view"
          placeholder="blur"
          quality={100}
          fill
          sizes="(max-width: 768px) 1000px, 100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center bottom',
          }}
        />
      </Box>
    </Box>
  );
}
