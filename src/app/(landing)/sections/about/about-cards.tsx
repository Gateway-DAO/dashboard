'use client';

import useValueByBreakpoint from '@/hooks/use-value-by-breakpoint';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Card, Typography } from '@mui/material';

import EncryptedDataVaults from './icons/encrypted-data-vaults';
import OnChainCoordination from './icons/on-chain-coordination';
import ProgrammaticAccessControl from './icons/programmatic-access-control';
import VerifiablePrivateCompute from './icons/verifiable-private-compute';

const cards = [
  {
    icon: EncryptedDataVaults,
    title: 'Encrypted Data Vaults',
    text: "Gateway's secure, decentralized, and privacy preserving storage network.",
  },
  {
    icon: ProgrammaticAccessControl,
    title: 'Programmatic Access Control',
    text: 'We are enabling secure off-chain data requesting and sharing by leveraging proxy re-encryption tied to our',
  },
  {
    icon: VerifiablePrivateCompute,
    title: 'Verifiable Private Compute',
    text: 'Gateway is the first FHE based computation network for enabling private data building blocks.',
  },
  {
    icon: OnChainCoordination,
    title: 'On-Chain Coordination',
    text: 'A global data audit trail which verifies data interactions like storage, requests, shares, and compute.',
  },
];

function AboutCard({
  icon: Icon,
  title,
  text,
  isFirst,
  isLast,
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
        ml: {
          xs: 2,
          sm: 3,
          md: !isFirst ? 1 : 0,
        },
        width: {
          xs: 'unset',
          sm: 'calc(100% - 32px)',
          md: 'unset',
        },
        mr: {
          xs: 2,
          sm: 0,
          md: !isLast ? 1 : 0,
        },
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
  const slidesToShow = useValueByBreakpoint({
    xs: 1,
    sm: 3,
    md: 4,
  });

  const isInfinite = useValueByBreakpoint({
    xs: true,
    sm: false,
  });

  return (
    <>
      <Slider dots slidesToShow={slidesToShow} infinite={isInfinite}>
        {cards.map((card, index) => (
          <AboutCard
            key={index}
            {...card}
            isFirst={index === 0}
            isLast={index === cards.length - 1}
          />
        ))}
      </Slider>
    </>
  );
}
