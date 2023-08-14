import { useTheme } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

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
        }
      }}
    />
  );
};
