'use client';
import { useSession } from 'next-auth/react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import MenuItemLink from '@/components/menu-item-link/menu-item-link';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';

import { Divider, ListItemIcon, ListItemText } from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function AuthDropdownProfilesList({ onClose }: Props) {
  const { data: session } = useSession();

  const { isOrg, organization } = useOrganization();

  if (!session) return null;

  const { user } = session;

  const accessess = isOrg
    ? user.accesses?.filter(
        ({ organization: accessOrganization }) =>
          accessOrganization.id !== organization.id
      )
    : user.accesses;

  if (!user.accesses?.length) return null;

  return (
    <>
      {accessess?.map(({ organization }) => (
        <MenuItemLink
          href={routes.dashboardOrgIssuedAssets(organization.gatewayId)}
          key={organization.id}
          onClick={onClose}
        >
          <ListItemIcon>
            <GTWAvatar
              src={organization.image}
              name={organization.name}
              hasBorder={!!organization.image}
            />
          </ListItemIcon>
          <ListItemText secondary={`@${organization.gatewayId}`}>
            {organization.name}
          </ListItemText>
        </MenuItemLink>
      ))}
      {isOrg && (
        <MenuItemLink
          href={routes.dashboardUserHome}
          key={user.id}
          onClick={onClose}
        >
          <ListItemIcon>
            <GTWAvatar name={user.gatewayId ?? 'User'} />
          </ListItemIcon>
          <ListItemText secondary={`@${user.gatewayId}`}>
            {user.gatewayId}
          </ListItemText>
        </MenuItemLink>
      )}
      <Divider />
    </>
  );
}
