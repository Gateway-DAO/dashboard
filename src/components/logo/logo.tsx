import { Typography } from '@mui/material';

import GatewaySquaredIcon from '../icons/gateway-squared';

type Props = {
  theme?: 'light' | 'dark';
};

export default function Logo({ theme = 'light' }: Props) {
  return (
    <>
      <GatewaySquaredIcon
        sx={{ fontSize: 40 }}
        backgroundProps={
          theme === 'light'
            ? { color: 'inherit' }
            : { color: '#E6D5FA', fillOpacity: 1 }
        }
      />
      <Typography
        component="h1"
        ml={1}
        color={theme === 'light' ? 'common.black' : 'common.white'}
        fontWeight="bold"
      >
        Gateway
      </Typography>
    </>
  );
}
