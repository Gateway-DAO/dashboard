import { FC, ReactNode } from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import { Link, List, ListItem, ListProps, SvgIconProps, Typography } from '@mui/material';


type Props = {
  menuItems: ReactNode;
} & ListProps;

export default function Menu({ menuItems, ...props }: Props) {
  return (
    <List component={'ul'} {...props}>
      {menuItems}
    </List>
  );
}
