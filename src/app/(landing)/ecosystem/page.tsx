'use client';
import { useRef } from 'react';

import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';

import { Box, Container, Stack, Typography } from '@mui/material';

import { Card } from './component/card';
import { cards } from './data';
import styles from './hero.module.scss';

export default function EcosystemPage() {
  const sectionRef = useRef<HTMLElement>(null);

  const cardRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');

  useHeaderVariantDetection(cardRef, 'dark');

  return (
    <>
      <section className={styles.element} ref={sectionRef}>
        <Container
          component={Stack}
          sx={{
            display: 'flex',
            py: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            maxWidth={{ xs: '100%', md: '65%' }}
            alignSelf={'flex-start'}
            marginLeft={{ xs: 0, md: 21 }}
            marginTop={20}
            fontWeight={300}
            color={'#000000DE'}
          >
            Discover the Thriving{' '}
            <Typography variant="inherit" color={'primary.main'}>
              Gateway Network
            </Typography>
          </Typography>
        </Container>
      </section>
      <section className={styles.cards} ref={cardRef}>
        <Stack maxWidth={'60vw'}>
          <Typography>Filter :</Typography>
        </Stack>
        <Box
          sx={{
            maxWidth: '60vw',
            margin: 'auto',
            py: 5,
            gap: 4,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
              lg: `repeat(${3}, 1fr)`,
            },
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.name}
              img={card.logo}
              description={card.description}
              name={card.name}
              tags={card.tags}
            ></Card>
          ))}
        </Box>
      </section>
    </>
  );
}
