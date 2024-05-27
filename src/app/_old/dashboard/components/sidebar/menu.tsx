import { ReactNode } from 'react';

import { List, ListProps } from '@mui/material';

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
