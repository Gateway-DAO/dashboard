'use client';

import { useMenu } from '@/hooks/use-menu';

import { Chip, Menu, MenuItem } from '@mui/material';

type Props = {
  tags: string[];
};

export default function ExtraTags({ tags }: Props) {
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu();
  const total = `+${tags.length}`;
  return (
    <>
      <Chip size="small" onClick={onOpen} label={total} />

      <Menu
        id="extra-tags"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'extra-tags',
        }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        {tags.map((tag: any, index: number) => (
          <MenuItem key={index} disableTouchRipple>
            {tag}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
