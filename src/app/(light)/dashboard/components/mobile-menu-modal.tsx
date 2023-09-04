'use client';
import {
  List,
  Modal,
  Stack
} from '@mui/material';

import GTWMenuItem, { GTWMenuItemSettings } from './menu-item/menu-item';
import MobileHeader from './mobile-header';

type Props = {
  isMenuOpen: boolean, setIsMenuOpen: (active: boolean) => void, menuItems: GTWMenuItemSettings[], activePath: string
}

export function MobileMenuModal({ activePath, isMenuOpen, menuItems, setIsMenuOpen }: Props) {
  return <Modal
    hideBackdrop
    open={isMenuOpen}
    sx={{
      bottom: 56,
    }}
    onClose={() => setIsMenuOpen(false)}
  >
    <Stack
      direction="column"
      sx={{
        height: '100%',
        bgcolor: 'background.default',
      }}
    >
      <MobileHeader />
      <List>
        {menuItems.map((item) => (
          <GTWMenuItem
            key={item.name}
            active={activePath === item.href}
            onClick={() => setIsMenuOpen(false)}
            {...item} />
        ))}
      </List>
    </Stack>
  </Modal>;
}
