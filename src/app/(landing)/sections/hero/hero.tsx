import Image from 'next/image';
import Link from 'next/link';

import HeroImage from 'public/images/hero.png';

import { Box, Button, Container, Typography } from '@mui/material';

import HeroSlider from './slider';

export default function Hero() {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        backgroundColor: 'primary.main',
        pt: 8,
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
          color: 'white!important',
        }}
        maxWidth="xl"
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
              md: 800,
            },
            mb: 1,
            color: 'inherit',
          }}
          gutterBottom
        >
          The Decentralized Private Computer
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
          Gateway is an integrated protocol to encrypt, store, manage, and
          compute private data.
        </Typography>
        <Button
          component={Link}
          href="#"
          variant="contained"
          color="white"
          size="large"
          sx={{
            width: {
              xs: '100%',
              sm: 'auto',
            },
            mb: {
              xs: 5,
              sm: 9,
            },
          }}
        >
          Read Documentation
        </Button>
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
        <HeroSlider />
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
