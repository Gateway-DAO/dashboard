"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import MenuItemLink from "@/components/menu-item-link/menu-item-link";
import routes from "@/constants/routes";
import useOrganization from "@/hooks/use-organization";

import { AccountCircleOutlined, LogoutOutlined } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";

type Props = {
  onClose: () => void;
}

export default function AuthDropdown({ onClose }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const onSignOut = async () => {
    await signOut();
    router.push("/");
  };
  const { isOrg, organization } = useOrganization();

  if (!session) return null;

  const { user } = session;

  const accessess = isOrg ? user.accesses?.filter(({ organization: accessOrganization }) => accessOrganization.id !== organization.id) : user.accesses;

  return (<>
    {user.accesses?.length && <>
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
    </>}
    <MenuItem onClick={onClose}>
      <ListItemIcon>
        <AccountCircleOutlined />
      </ListItemIcon>
      <ListItemText>GatewayId</ListItemText>
    </MenuItem>
    <MenuItem onClick={onSignOut}>
      <ListItemIcon>
        <LogoutOutlined />
      </ListItemIcon>
      <ListItemText>Disconnect</ListItemText>
    </MenuItem>
  </>)
}
