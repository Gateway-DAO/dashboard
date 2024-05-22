import { Plus_Jakarta_Sans } from 'next/font/google';

import { TypographyOptions } from '@mui/material/styles/createTypography';

export const plus_jakarta_sans = Plus_Jakarta_Sans({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '500', '700'],
});

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: `${plus_jakarta_sans.style.fontFamily}, sans-serif`,
  },
  h1: {
    fontWeight: 'normal',
  },
  h2: {
    fontWeight: 'lighter',
  },
  h3: {
    fontWeight: 'normal',
  },
  h4: {
    fontWeight: 'normal',
  },
  h5: {
    fontWeight: 'normal',
  },
  h6: {
    fontWeight: 'normal',
  },
  subtitle1: {
    fontWeight: 'bold',
  },
  subtitle2: {
    fontWeight: 'bold',
  },
};

export default typography;
