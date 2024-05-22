import { common } from '@/locale/en/common';

import { Typography } from '@mui/material';

import GatewaySquaredIcon from '../icons/gateway-squared';

type Props = {
  theme?: 'light' | 'dark';
  isHeader?: boolean;
};

export default function GTWLogo({ theme = 'light', isHeader = true }: Props) {
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
        {...(isHeader && { component: 'h1' })}
        ml={1}
        color={theme === 'light' ? 'common.black' : 'common.white'}
        fontWeight="bold"
      >
        {common.general.gateway}
      </Typography>
    </>
  );
}
