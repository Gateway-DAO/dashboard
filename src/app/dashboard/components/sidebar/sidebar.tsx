import { PropsWithChildren, ReactNode } from 'react';

import { GatewayIcon } from '@/components/icons/gateway';

import { Link, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import Logo from './logo';

interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}

type Props = {
  menuItems: Array<MenuItem>;
};

export default function Sidebar({ menuItems }: Props) {
  return (
    <Stack
      component={'aside'}
      sx={{
        height: '100vh',
        borderRight: '1px solid',
        borderColor: 'divider',
        maxWidth: '300px',
        padding: '2rem',
      }}
    >
      <Logo />
      <Stack component={'ul'}>
        {menuItems?.map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              underline={'none'}
              sx={{
                color: 'text.secondary',
                ':hover': {
                  color: 'primary.main',
                },
              }}
            >
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                {item.icon}
                <Typography variant="h2" sx={{ fontSize: '1rem' }}>
                  {item.name}
                </Typography>
              </Stack>
            </Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
