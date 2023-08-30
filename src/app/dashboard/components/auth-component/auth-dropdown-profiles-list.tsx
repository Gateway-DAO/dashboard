"use client";
import { useSession } from "next-auth/react";

import MenuItemLink from "@/components/menu-item-link/menu-item-link";
import routes from "@/constants/routes";
import useOrganization from "@/hooks/use-organization";

import { Avatar, Divider, ListItemIcon, ListItemText } from "@mui/material";

type Props = {
  onClose: () => void;
}

export default function AuthDropdownProfilesList({ onClose }: Props) {
  const { data: session } = useSession();

  const { isOrg, organization } = useOrganization();

  if (!session) return null;

  const { user } = session;

  const accessess = isOrg ? user.accesses?.filter(({ organization: accessOrganization }) => accessOrganization.id !== organization.id) : user.accesses;

  if (!user.accesses?.length) return null;

  return (
    <>
      {accessess?.map(({ organization }) => (
        <MenuItemLink href={routes.dashboardOrg.replace("[id]", organization.gatewayId)} key={organization.id} onClick={onClose}>
          <ListItemIcon>
            <Avatar src={organization.image || undefined} sizes="small" sx={{
              border: organization.image ? (theme) => `1px solid ${theme.palette.divider}` : undefined,
            }} />
          </ListItemIcon>
          <ListItemText secondary={`@${organization.gatewayId}`}>
            {organization.name}
          </ListItemText>
        </MenuItemLink>
      ))}
      {isOrg && <MenuItemLink href={routes.dashboardUser} key={user.id} onClick={onClose}>
        <ListItemIcon>
          <Avatar sizes="small" />
        </ListItemIcon>
        <ListItemText secondary={`@${user.gatewayId}`}>
          {user.gatewayId}
        </ListItemText>
      </MenuItemLink>}
      <Divider />
    </>
  )
}
