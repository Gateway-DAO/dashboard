import { ReactNode } from 'react';

import { Link, List, ListItem, ListProps, Typography } from '@mui/material';
import { Stack, SxProps } from '@mui/system';

interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}

type Props = {
  menuItems: Array<MenuItem>;
} & ListProps;

export default function Menu({ menuItems, ...props }: Props) {
  return (
    <List component={'ul'} {...props}>
      {menuItems?.map((item) => (
        <ListItem key={item.name} sx={{ pl: 0 }}>
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
        </ListItem>
      ))}
    </List>
  );
}
