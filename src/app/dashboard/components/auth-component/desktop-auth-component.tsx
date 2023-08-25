"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useMenu } from "@/hooks/use-menu";

import { Avatar, ButtonBase, ButtonBaseProps, Menu, Stack, Theme, Typography, alpha } from "@mui/material";
import { SystemStyleObject, } from "@mui/system";

import AuthDropdown from "./auth-dropdown";

export default function DesktopAuthComponent(props: ButtonBaseProps) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu()
  const pathname = usePathname();
  const isOrg = pathname.includes("/dashboard/org/");

  if (!session) return null;

  const { user } = session;

  return <>
    <ButtonBase
      id="desktop-profile-button"
      aria-controls={isOpen ? 'profile-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={isOpen ? 'true' : undefined}
      {...props}
      sx={[
        props.sx as SystemStyleObject<Theme>,
        (theme) => ({
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          justifyContent: 'flex-start',
          p: 2,
          textAlign: 'left',
        })]} onClick={onOpen}>
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
      <AuthDropdown onClose={onClose} />
    </Menu>
  </>;
}
