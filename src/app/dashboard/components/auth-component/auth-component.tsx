'use client';

import { useSession } from 'next-auth/react';

import { useMenu } from '@/hooks/use-menu';
import { limitCharsOffset } from '@/utils/string';

import { MoreHorizOutlined } from '@mui/icons-material';
import { ButtonBase, Menu } from '@mui/material';

import AuthComponentSkeleton from './auth-component-skeleton';
import AuthDropdown from './auth-dropdown';
import UserOrgInfo from './user-org-info';

type Props = {
  id: string;
  controlId: string;
};

export default function AuthComponent({ id, controlId }: Props) {
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu();

  if (!session?.user) {
    return <AuthComponentSkeleton />;
  }

  return (
    <>
      <ButtonBase
        id={id}
        aria-controls={isOpen ? controlId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        sx={(theme) => ({
          backgroundColor: 'primary.100',
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          justifyContent: 'space-between',
          p: 2,
          textAlign: 'left',
          flexDirection: 'row',
        })}
        onClick={onOpen}
      >
        <UserOrgInfo
          id={session.user.did}
          image={session.user.profile_picture}
          name={session.user.username}
          gatewayId={limitCharsOffset(session.user.did!, 10, 5)!}
        />

        <MoreHorizOutlined
          sx={{
            color: 'action.active',
            zIndex: 2,
          }}
        />
      </ButtonBase>
      <Menu
        id={controlId}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': id,
          sx: {
            minWidth: 305,
          },
        }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        sx={{
          '.MuiListItemIcon-root': {
            minWidth: (theme) => `${theme.spacing(5 + 1.5)} !important`,
          },
        }}
      >
        <AuthDropdown onClose={onClose} />
      </Menu>
    </>
  );
}
