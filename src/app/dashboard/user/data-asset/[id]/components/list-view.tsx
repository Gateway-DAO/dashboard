'use client';
import { useMemo } from 'react';

import { List, ListItem } from '@mui/material';

type Props = {
  value: string;
};

export function ListView({ value }: Props) {
  const items = useMemo(() => {
    let list: string[] = [];
    if (value?.indexOf(',') > -1) {
      list = value.split(',');
    } else if (value !== '') {
      list.push(value);
    }
    list = list.map((item) => item.replace(/\s/g, ''));
    return list;
  }, [value]);

  return (
    <List sx={{ listStyle: 'inside' }}>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ display: 'list-item', p: 0, m: 0 }}>
          {item}
        </ListItem>
      ))}
    </List>
  );
}
