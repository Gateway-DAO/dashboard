'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Card, Typography } from '@mui/material';

import EncryptedDataVaults from './icons/encrypted-data-vaults';
import OnChainCoordination from './icons/on-chain-coordination';
import ProgrammaticAccessControl from './icons/programmatic-access-control';
import VerifiablePrivateCompute from './icons/verifiable-private-compute';

const cards = [
  {
    icon: EncryptedDataVaults,
    title: 'Expanded Possibilities',
    text: 'Write smart contracts that seamlessly mix private and public state.',
  },
  {
    icon: OnChainCoordination,
    title: 'New Use Cases',
    text: 'Build applications with actual competitive dynamics and hidden information.',
  },
  {
    icon: VerifiablePrivateCompute,
    title: 'Unlimited Potential',
    text: 'Deploy solutions that would be impractical on current chains.',
  },
  {
    icon: ProgrammaticAccessControl,
    title: 'Maintain Simplicity',
    text: 'Maintain simplicity-no complex cross-chain architectures or external privacy solutions.',
  },
];

function AboutCard({
  icon: Icon,
  title,
  text,
}: (typeof cards)[0] & { isFirst?: boolean; isLast?: boolean }) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: {
          xs: 2,
          md: 3,
          lg: 4,
        },
        minHeight: 316,
        height: '100%',
        width: {
          xs: 'calc(100% - (5 * 16px))',
          md: 'calc(100% - (9 * 16px))',
          lg: 'unset',
        },
        bgcolor: '#EDE3F6',
      }}
    >
      <Icon
        sx={{
          mb: 8,
          width: 56,
          height: 56,
        }}
      />
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Card>
  );
}

export default function AboutCards() {
  return (
    <>
      <Swiper
        pagination={{
          enabled: true,
        }}
        slidesPerView={1}
        spaceBetween={18}
        slidesOffsetBefore={24}
        slidesOffsetAfter={-24}
        modules={[Pagination]}
        breakpoints={{
          900: {
            slidesPerView: 2,
            spaceBetween: -76,
            slidesOffsetBefore: 48,
            slidesOffsetAfter: -48,
            pagination: {
              enabled: true,
            },
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            pagination: {
              enabled: false,
            },
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <AboutCard
              {...card}
              isFirst={index === 0}
              isLast={index === cards.length - 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
