import MUIGlobalStyles from '@mui/material/GlobalStyles';

import { plus_jakarta_sans } from './config/typography';

export const GlobalStyles = () => {
  return (
    <MUIGlobalStyles
      styles={{
        'html, body': {
          height: '100%',
          scrollBehavior: 'smooth',
        },
        body: {
          padding: 0,
          fontFamily: `${plus_jakarta_sans.style.fontFamily}, sans-serif`,
        },
        '*': {
          fontFamily: `${plus_jakarta_sans.style.fontFamily}, sans-serif`,
        },
        '.wallet-adapter-modal': {
          zIndex: '2000 !important',
        },
      }}
    />
  );
};
