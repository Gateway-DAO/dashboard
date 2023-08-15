import { Plus_Jakarta_Sans } from 'next/font/google'

import { TypographyOptions } from '@mui/material/styles/createTypography';

export const plus_jakarta_sans = Plus_Jakarta_Sans({
    display: 'swap',
    subsets: ['latin'],
})

// export const fira_code = Fira_Code({
//     display: 'swap',
// })


const typography: TypographyOptions = {
    allVariants: {
      fontFamily: `"${plus_jakarta_sans.style.fontFamily}", sans-serif`,
    },
    h1: {
      fontWeight: 'medium',
    },
    h2: {
      fontWeight: 'medium',
    },
    h3: {
      fontWeight: 'medium',
    },
    h4: {
      fontWeight: 'medium',
    },
    h5: {
      fontWeight: 'medium',
    },
    h6: {
      fontWeight: 'medium',
    },
    subtitle1: {
      fontWeight: 'bold',
    },
    subtitle2: {
      fontWeight: 'bold',
    },
  };

export default typography;
