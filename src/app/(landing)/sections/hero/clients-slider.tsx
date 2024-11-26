'use client';

import Image from 'next/image';
import Link from 'next/link';

import Marquee from 'react-fast-marquee';

import { Box } from '@mui/material';

const logos = [
  {
    href: 'https://healelabs.com/',
    src: 'heale.svg',
    alt: 'Heale Network',
    width: 113,
    height: 41,
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
    src: 'henry.svg',
    alt: 'Henry',
    width: 111,
    height: 30,
  },
  {
    href: 'https://www.campnetwork.xyz/',
    src: 'camp.svg',
    alt: 'Camp Network',
    width: 111,
    height: 30,
  },
  {
    href: 'https://lilypad.tech/',
    src: 'lily.svg',
    alt: 'Lily Pad',
    width: 111,
    height: 30,
  },
  {
    href: 'https://emmet.finance/',
    src: 'emet.svg',
    alt: 'Emet',
    width: 111,
    height: 30,
  },
  {
    href: 'https://mira.ly/',
    src: 'mira.svg',
    alt: 'Mira Finance',
    width: 113,
    height: 41,
  },
  {
    href: 'https://www.atoma.network/',
    src: 'atoma.svg',
    alt: 'Atoma Network',
    width: 113,
    height: 41,
  },
  {
    href: 'https://www.credprotocol.com/',
    src: 'cred.svg',
    alt: 'Cred',
    width: 113,
    height: 41,
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
