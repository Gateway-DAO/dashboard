"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


import { AccountCircleOutlined, LogoutOutlined } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import AuthDropdownProfilesList from "./auth-dropdown-profiles-list";

type Props = {
  onClose: () => void;
}

export default function AuthDropdown({ onClose }: Props) {
  const router = useRouter();
  const onSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (<>
    <AuthDropdownProfilesList onClose={onClose} />
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
