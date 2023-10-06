'use client';

import { useMenu } from '@/hooks/use-menu';
import { settings } from '@/locale/en/settings';
import { OrganizationRole } from '@/services/protocol/types';

import { MoreVert } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItemButton, Menu } from '@mui/material';

type Props = {
  userId: string;
  role: OrganizationRole;
  onChangeRole: (userId: string, role: OrganizationRole) => void;
  onRemoveUser: (userId: string) => void;
};
export default function ManageMemberButton({
  role,
  userId,
  onChangeRole,
  onRemoveUser,
}: Props) {
  const { element, isOpen, onClose, onOpen } = useMenu();
  const newRole =
    role === OrganizationRole.Admin
      ? OrganizationRole.Member
      : OrganizationRole.Admin;
  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={element} open={isOpen} onClose={onClose}>
        <ListItemButton
          onClick={() => {
            onChangeRole(userId, newRole);
            onClose();
          }}
        >
          Change user to {newRole}
          {}
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            onRemoveUser(userId);
            onClose();
          }}
        >
          Remove
        </ListItemButton>
      </Menu>
    </>
  );
}
