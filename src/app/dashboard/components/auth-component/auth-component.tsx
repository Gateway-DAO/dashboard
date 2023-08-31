'use client';

import { useSession } from 'next-auth/react';

import { ConnectNow } from '@/components/buttons/connect-now';
import { useMenu } from '@/hooks/use-menu';
import useOrganization from '@/hooks/use-organization';

import { MoreHorizOutlined } from '@mui/icons-material';
import { ButtonBase, Menu, alpha } from '@mui/material';

import AuthDropdown from './auth-dropdown';
import UserOrgInfo from './user-org-info';

type Props = {
  id: string;
  controlId: string;
};

export default function AuthComponent({ id, controlId }: Props) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu();
  const { isOrg, organization } = useOrganization();

  if (!session) return <ConnectNow />;

  const { user } = session;

  return (
    <>
      <ButtonBase
        id={id}
        aria-controls={isOpen ? controlId : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        sx={(theme) => ({
          backgroundColor: {
            xs: 'transparent',
            lg: alpha(
              theme.palette.primary.main,
              theme.palette.action.focusOpacity
            ),
          },
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          justifyContent: 'space-between',
          p: 2,
          mr: {
            xs: -2,
            lg: 0,
          },
          textAlign: 'left',
          flexDirection: {
            xs: 'row-reverse',
            lg: 'row',
          },
        })}
        onClick={onOpen}
      >
        <UserOrgInfo
          image={isOrg ? organization.image : undefined}
          name={isOrg ? organization.name! : user.gatewayId!}
          gatewayId={isOrg ? organization.gatewayId! : user.gatewayId!}
        />
        <MoreHorizOutlined
          sx={{
            color: 'action.active',
            backgroundColor: {
              xs: 'white',
              lg: 'transparent',
            },
            borderRadius: {
              xs: '50%',
              lg: 0,
            },
            borderColor: {
              xs: 'divider',
              lg: 'transparent',
            },
            borderWidth: {
              xs: 1,
              lg: 0,
            },
            borderStyle: {
              xs: 'solid',
              lg: 'none',
            },
            marginRight: {
              xs: -1.5,
              lg: 0,
            },
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
