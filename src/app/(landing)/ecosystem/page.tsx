'use client';
import { useEffect, useRef, useState } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';

import { Box, Button, Stack, Typography } from '@mui/material';

import { Card } from './component/card';
import { cards } from './data';
import styles from './hero.module.scss';

const categories = [
  'All',
  'Networks',
  'AI',
  'DeFi',
  'DePIN',
  'Fintech',
  'Gating',
  'Consumer',
  'Humanhood/KYC',
  'Governance',
  'Education',
  'Compute',
];

export default function EcosystemPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategorie, setSelectedCategorie] = useState<string[]>(['All']);

  useEffect(() => {
    console.log('Component re-rendered');
  }, [selectedCategorie]);

  const cardRef = useRef<HTMLElement>(null);
  const filteredCards = cards.filter((card) => {
    if (selectedCategorie.includes('All')) {
      return true;
    }
    return selectedCategorie.some((ele) => card.tags.includes(ele));
  });

  if (selectedCategorie.length == 0) {
    setSelectedCategorie(['All']);
  }

  function checkAddORRemoveElement(newElement: string) {
    if (newElement == 'All') {
      setSelectedCategorie(['All']);
      return;
    }
    if (selectedCategorie.includes(newElement)) {
      const filteredElements = selectedCategorie.filter(
        (ele) => ele != newElement
      );
      setSelectedCategorie([...filteredElements]);
    } else {
      const uniqueSet = new Set(selectedCategorie);
      uniqueSet.delete('All');

      setSelectedCategorie([...uniqueSet, newElement]);
    }
  }
  useHeaderVariantDetection(sectionRef, 'dark');

  useHeaderVariantDetection(cardRef, 'dark');

  return (
    <>
      <section className={styles.element} ref={sectionRef}>
        <Wrapper className={styles.wrapper}>
          <h1 className={styles.title}>
            Discover the Thriving{' '}
            <span className={styles.highlight}>Gateway Network</span>
          </h1>
        </Wrapper>
      </section>
      <section className={styles.cards} ref={cardRef}>
        <Wrapper className={styles.wrapper}>
          <Typography variant="body1" mb={2}>
            Filter :
          </Typography>
          <Stack direction={'row'} flexWrap={'wrap'} gap={2.2} columnGap={1}>
            {categories.map((categorie) => (
              <Button
                key={categorie}
                sx={{
                  ...(!selectedCategorie.includes(categorie)
                    ? {
                        background: 'primary',
                        color: '#00000061',
                        borderColor: ' #0000001F',
                      }
                    : {}),
                }}
                onClick={() => checkAddORRemoveElement(categorie)}
                size={'medium'}
                variant={
                  selectedCategorie.includes(categorie)
                    ? 'contained'
                    : 'outlined'
                }
              >
                {categorie}
              </Button>
            ))}
          </Stack>

          <Box
            sx={{
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
            {filteredCards.map((card) => (
              <Card
                key={card.name}
                img={card.logo}
                description={card.description}
                name={card.name}
                tags={card.tags}
                url={card.url}
              ></Card>
            ))}
          </Box>
        </Wrapper>
      </section>
    </>
  );
}
