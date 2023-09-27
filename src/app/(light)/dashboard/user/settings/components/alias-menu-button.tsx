'use client';

import { useMenu } from '@/hooks/use-menu';
import { settings } from '@/locale/en/settings';

import { MoreVert } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItemButton, Menu } from '@mui/material';

type Props = {
  onDisconnect: () => void;
};
export default function AliasMenuButton({ onDisconnect }: Props) {
  const { element, isOpen, onClose, onOpen } = useMenu();

  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={element} open={isOpen} onClose={onClose}>
        <ListItemButton
          onClick={() => {
            onDisconnect();
            onClose();
          }}
        >
          <CloseIcon sx={{ mr: 1 }} />
          {settings.actions.disconnect}
        </ListItemButton>
      </Menu>
    </>
  );
}
