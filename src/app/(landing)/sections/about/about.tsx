import Image from 'next/image';
import Link from 'next/link';

import documentationRoutes from '@/constants/documentationRoutes';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import AboutCards from './about-cards';

import NavigationImage from '/public/images/navigation.jpg';
import FeaturesImage from '/public/images/features.jpg';

type Props = {
  isFeatureSection: boolean;
};

export default function About({ isFeatureSection }: Props) {
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
          }}
        >
          <CardActionArea
            component={Link}
            href={documentationRoutes.home}
            target="_blank"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              pb: {
                xs: 4,
                md: 42.25,
              },
              gap: 4,
              bgcolor: '#fff',
            }}
          >
            <Stack gap={1}>
              <Typography
                component="h3"
                variant="subtitle1"
                color={isFeatureSection ? 'secondary.dark' : 'primary.main'}
              >
                {isFeatureSection ? 'Key Features' : 'For developers'}
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
                {isFeatureSection
                  ? 'Gateway’s Unified State'
                  : 'Why use Gateway?'}
              </Typography>
              <Typography variant="body1">
                {isFeatureSection
                  ? 'Layer 1 blockchain revolutionizes development with programmable cryptography, enabling secure execution over encrypted and public state data. By allowing encrypted data to remain encrypted during composable interactions, Gateway unlocks innovative possibilities for applications.'
                  : 'Gateway is the only Layer 1 blockchain offering native unified state, eliminating the need for extra layers or co-processors. With Gateway, developers get everything they need to build powerful applications and unlock new use cases.'}
              </Typography>
            </Stack>
            {!isFeatureSection && (
              <Button
                component="span"
                size="large"
                variant="contained"
                sx={{ alignSelf: 'flex-start' }}
              >
                Start building
              </Button>
            )}
          </CardActionArea>
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
            src={isFeatureSection ? FeaturesImage : NavigationImage}
            alt={
              isFeatureSection
                ? 'GVMs on a futuristic planet'
                : 'A worker working on a futuristic navigation system'
            }
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
          pt: 2,
          px: {
            xs: 0,
            lg: 6,
          },
        }}
      >
        <AboutCards isFeatureSection={isFeatureSection} />
      </Container>
    </Box>
  );
}
