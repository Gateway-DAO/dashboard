import Image from 'next/image';
import Link from 'next/link';

import CTAImage from 'public/images/cta.png';

import { Box, Button, Container, Typography } from '@mui/material';

export default function BuildWithUs() {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          color: 'white!important',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
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
          }}
        >
          Unlock the full potential of user autonomy and consent in your app or
          service with Gateway’s middleware to drive your business goals.
        </Typography>
        <Button
          component={Link}
          href="#"
          variant="contained"
          color="white"
          size="large"
        >
          Read Documentation
        </Button>
      </Container>
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
