'use client';

import Image from 'next/image';
import Link from 'next/link';

import Marquee from 'react-fast-marquee';

import { Box } from '@mui/material';

const logos = [
  {
    href: 'https://li.fi/',
    src: 'lifi.svg',
    alt: 'Li.Fi',
    width: 104,
    height: 40,
  },
  {
    href: 'https://dimo.zone/',
    src: 'dimo.svg',
    alt: 'Dimo',
    width: 109,
    height: 30,
  },
  {
    href: 'https://www.plumenetwork.xyz/',
    src: 'plume.svg',
    alt: 'Plume Network',
    width: 157,
    height: 45,
  },
  {
    href: 'https://www.atoma.network/',
    src: 'atoma.svg',
    alt: 'Atoma Network',
    width: 113,
    height: 41,
  },
  {
    href: 'https://www.heurist.ai/',
    src: 'heurist.svg',
    alt: 'Heurist',
    width: 134,
    height: 37,
  },
  {
    href: 'https://shiza.ai/',
    src: 'shiza.png',
    alt: 'Shiza',
    width: 140,
    height: 35,
  },
  {
    href: 'https://www.campnetwork.xyz/',
    src: 'camp.svg',
    alt: 'Camp Network',
    width: 111,
    height: 30,
  },
  {
    href: 'https://www.blackbird.xyz/',
    src: 'blackbird.svg',
    alt: 'Blackbird',
    width: 192,
    height: 31,
  },
];

export default function HeroClientsSlider() {
  return (
    <Marquee autoFill>
      {logos.map(({ href, src, alt, ...props }) => (
        <Box
          component={Link}
          key={src}
          href={href}
          target="_blank"
          sx={{
            mr: {
              xs: 4,
              sm: 8,
              lg: 11,
            },
          }}
        >
          <Image src={`/images/clients/${src}`} alt={alt} {...props} />
        </Box>
      ))}
    </Marquee>
  );
}
