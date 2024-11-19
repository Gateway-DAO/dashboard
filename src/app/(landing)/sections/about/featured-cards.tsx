'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Card, SvgIconProps, Typography } from '@mui/material';

import EncryptedOnChain from './icons/encrypted-on-chain';
import EncryptedComposability from './icons/encrypted-composability';
import PETMarketplace from './icons/pet-marketplace';
import EVMCompatible from './icons/evm-compatilbe';

type CardProp = {
  icon: (props: SvgIconProps) => JSX.Element;
  title: string;
  text: string;
};

const featuresCards: CardProp[] = [
  {
    icon: EncryptedOnChain,
    title: 'Encrypted on chain',
    text: 'Store encrypted data on the blockchain to unlock innovative application possibilities.',
  },
  {
    icon: EncryptedComposability,
    title: 'Encrypted composability',
    text: 'Encrypted data stays encrypted as applications interact with full composability.',
  },
  {
    icon: PETMarketplace,
    title: 'PET Marketplace',
    text: 'An ecosystem where diverse privacy-enhancing technologies (PETs) seamlessly integrate as specialized co-processors.',
  },
  {
    icon: EVMCompatible,
    title: 'EVM Compatible',
    text: 'No language, or learning hurdle to begin building.',
  },
];

function FeaturedCard({ icon: Icon, title, text }: CardProp) {
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
        bgcolor: '#E7FCFF',
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

export default function FeaturedCards() {
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
        {featuresCards.map((card, index) => (
          <SwiperSlide key={index}>
            <FeaturedCard {...card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
