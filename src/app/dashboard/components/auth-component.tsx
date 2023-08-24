"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useMenu } from "@/hooks/use-menu";

import { Avatar, ButtonBase, Divider, ListItemIcon, Menu, MenuItem, Stack, Typography, alpha } from "@mui/material";

export default function AuthComponent() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu()
  const pathname = usePathname();
  const isOrg = pathname.includes("/dashboard/org/");

  const router = useRouter();
  const onSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!session) return null;

  const { user } = session;

  return <>
    <ButtonBase
      id="desktop-profile-button"
      aria-controls={isOpen ? 'profile-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={isOpen ? 'true' : undefined}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
        borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
        justifyContent: 'flex-start',
        p: 2,
        textAlign: 'left',
      })} onClick={onOpen}>
      <Avatar sx={{ mr: 1.5 }} />
      <Stack direction="column">
        <Typography component="span" variant="subtitle1" color="primary.main">
          {user.gatewayId}
        </Typography>
        <Typography component="span" variant="caption" color="primary.main">
          @{user.gatewayId}
        </Typography>
      </Stack>
    </ButtonBase>
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': "desktop-profile-button",
      }}
    >
      {user.accesses?.length && <>
        {user.accesses.map(({ organization }) => (
          <MenuItem key={organization.id} onClick={onClose}>
            <ListItemIcon>
              <Avatar src={organization.image || undefined} sizes="small" />
            </ListItemIcon>
            <Typography variant="body2">{organization.name}</Typography>
          </MenuItem>
        ))}
        <Divider />
      </>}
      <MenuItem onClick={onClose}>Profile</MenuItem>
      <MenuItem onClick={onSignOut}>Logout</MenuItem>
    </Menu>
  </>;
}
