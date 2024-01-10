'use client';

import { useMenu } from '@/hooks/use-menu';
import { settings } from '@/locale/en/settings';

import { MoreVert } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import { IconButton, ListItemButton, Menu } from '@mui/material';

type Props = {
  onDisconnect: () => void;
  onUpdateNotificationEmail?: () => void;
};
export default function AliasMenuButton({
  onDisconnect,
  onUpdateNotificationEmail,
}: Props) {
  const { element, isOpen, onClose, onOpen } = useMenu();

  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={element} open={isOpen} onClose={onClose}>
        {onUpdateNotificationEmail && (
          <ListItemButton
            onClick={() => {
              onUpdateNotificationEmail();
              onClose();
            }}
          >
            <NotificationsOutlined sx={{ mr: 1 }} />
            {settings.actions.receive_notifications_here}
          </ListItemButton>
        )}
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
