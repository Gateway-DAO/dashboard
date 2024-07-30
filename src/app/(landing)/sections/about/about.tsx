import Image from 'next/image';
import Link from 'next/link';

import NavigationImage from 'public/images/navigation.jpg';

import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';

import AboutCards from './about-cards';

export default function About() {
  return (
    <Box
      component="section"
      sx={{
        pt: 11,
        pb: 15,
      }}
    >
      <Stack
        component={Container}
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        gap={2}
      >
        <Stack
          component={Card}
          variant="outlined"
          sx={{
            backgroundColor: 'primary.100',
            width: {
              xs: 'unset',
              sm: '50%',
            },
            p: 4,
            justifyContent: 'space-between',
            gap: {
              xs: 4,
              md: 26,
            },
          }}
        >
          <Stack gap={1}>
            <Typography component="h3" variant="subtitle1" color="primary.main">
              For Business: Give Data Utility
            </Typography>
            <Typography
              component="h2"
              variant="h3"
              sx={{
                typography: {
                  xs: 'h5',
                  sm: 'h4',
                  md: 'h3',
                },
              }}
            >
              Encrypt, store, and power user-controlled data sharing with
              Gateway
            </Typography>
            <Typography variant="body1">
              A private and powerful computer for sensitive information.
            </Typography>
          </Stack>
          <Button
            component={Link}
            href="#"
            size="large"
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
          >
            Start building
          </Button>
        </Stack>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: 'primary.100',
            width: {
              xs: 'unset',
              sm: '50%',
            },

            position: 'relative',
            height: {
              xs: '100%',
              sm: 'auto',
            },
            aspectRatio: {
              xs: 327 / 306,
              sm: 'unset',
            },
          }}
        >
          <Image
            src={NavigationImage}
            alt="A worker working on a futuristic navigation system"
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: '35% 55%',
            }}
          />
        </Card>
      </Stack>
      <Container
        sx={{
          px: {
            xs: 0,
            md: 3,
          },
        }}
      >
        {/* <AboutCards /> */}
      </Container>
    </Box>
  );
}
