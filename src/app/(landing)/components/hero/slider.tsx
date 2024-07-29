'use client';

import Link from 'next/link';

import Marquee from 'react-fast-marquee';

import { AltRoute } from '@mui/icons-material';
import { Box } from '@mui/material';

const logos = [
  {
    href: 'https://li.fi/',
    src: 'lifi.svg',
    alt: 'Li.Fi',
  },
  {
    href: 'https://dimo.zone/',
    src: 'dimo.svg',
    alt: 'Dimo',
  },
  {
    href: 'https://www.pokt.network/',
    src: 'pokt.svg',
    alt: 'Pokt Network',
  },
  {
    href: 'https://www.plumenetwork.xyz/',
    src: 'plume.svg',
    alt: 'Plume Network',
  },
  {
    href: 'https://spherepay.co/',
    src: 'sphere.svg',
    alt: 'Sphere',
  },
  {
    href: 'https://www.accessprotocol.co/',
    src: 'access.svg',
    alt: 'Access Protocol',
  },
  {
    href: 'https://commonwealth.im/',
    src: 'commonwealth.svg',
    alt: 'Common',
  },
  {
    href: 'https://piggylet.com/',
    src: 'piggylet.svg',
    alt: 'Piggylet',
  },
  {
    href: 'https://www.tryodyssey.xyz/en/explore',
    src: 'odyssey.svg',
    alt: 'Odyssey',
  },
];

export default function HeroSlider() {
  return (
    <Marquee autoFill>
      {logos.map((logo, index) => (
        <Box
          component={Link}
          key={index}
          href={logo.href}
          target="_blank"
          sx={{
            mr: {
              xs: 4,
              sm: 8,
              lg: 11,
            },
          }}
        >
          <img src={`/images/${logo.src}`} alt={logo.alt} />
        </Box>
      ))}
    </Marquee>
  );
}
