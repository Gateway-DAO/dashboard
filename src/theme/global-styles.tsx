import { useTheme } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

import { plus_jakarta_sans } from './config/typography';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <MUIGlobalStyles
      styles={{
        'html, body': {
          height: '100%',
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: theme.palette.background.default,
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
