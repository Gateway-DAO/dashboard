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
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
  };

export default typography;
