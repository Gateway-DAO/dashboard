import { FC } from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import { Link, List, ListItem, ListProps, SvgIconProps, Typography } from '@mui/material';

export interface MenuItem {
  name: string;
  link: string;
  icon: FC<SvgIconProps>;
}

type Props = {
  menuItems: Array<MenuItem>;
} & ListProps;

export default function Menu({ menuItems, ...props }: Props) {
  return (
    <List component={'ul'} {...props}>
      {menuItems?.map(({ icon: Icon, link, name }) => (
        <ListItem key={name} sx={{ pl: 0 }}>
          <Link
            href={link}
            underline={'none'}
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              direction: 'row',
              gap: 2,
              ':hover': {
                svg: {
                  color: 'primary.main',
                },
                span: {
                  color: 'black',
                },
              },
            }}
          >
            <Icon sx={{ fontSize: 32 }} />
            <Typography
              component={'span'}
              variant="h2"
              sx={{ fontSize: '1rem' }}
            >
              {name}
            </Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
