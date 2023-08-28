"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useMenu } from "@/hooks/use-menu";

import { MoreHorizOutlined } from "@mui/icons-material";
import { Avatar, ButtonBase, ButtonBaseProps, Menu, Stack, Theme, Typography, alpha } from "@mui/material";
import { SystemStyleObject, } from "@mui/system";

import AuthDropdown from "./auth-dropdown";

type Props = {
  id: string;
  controlId: string;
}

export default function AuthComponent({ id, controlId }: Props) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu()
  const pathname = usePathname();
  const isOrg = pathname.includes("/dashboard/org/");
  const orgName = isOrg ? pathname.split("/")[3] : null;

  if (!session) return null;

  const { user } = session;

  return <>
    <ButtonBase
      id={id}
      aria-controls={isOpen ? controlId : undefined}
      aria-haspopup="true"
      aria-expanded={isOpen ? 'true' : undefined}
      sx={
        (theme) => ({
          backgroundColor: {
            xs: 'transparent',
            lg: alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          },
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          justifyContent: 'space-between',
          p: 2,
          mr: {
            xs: -2,
            lg: 0
          },
          textAlign: 'left',
          flexDirection: {
            xs: 'row-reverse',
            lg: 'row'
          }
        })} onClick={onOpen}>
      <Stack component="span" direction="row" alignItems="center" sx={{
        position: "relative",
      }}>
        <Avatar sx={{
          mr: {
            lg: 1.5
          },
          zIndex: 1,
        }} />
        <Stack direction="column" sx={{
          display: {
            xs: 'none',
            lg: 'flex'
          }
        }}>
          <Typography component="span" variant="subtitle1" color="primary.main">
            {user.gatewayId}
          </Typography>
          <Typography component="span" variant="caption" color="primary.main">
            @{user.gatewayId}
          </Typography>
        </Stack>
      </Stack>
      <MoreHorizOutlined sx={{
        color: "action.active",
        backgroundColor: {
          xs: 'white',
          lg: 'transparent',
        },
        borderRadius: {
          xs: '50%',
          lg: 0
        },
        borderColor: {
          xs: 'divider',
          lg: 'transparent',
        },
        borderWidth: {
          xs: 1,
          lg: 0
        },
        borderStyle: {
          xs: 'solid',
          lg: 'none'
        },
        marginRight: {
          xs: -1.5,
          lg: 0
        },
        zIndex: 2
      }} />
    </ButtonBase>
    <Menu
      id={controlId}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': id,
      }}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'top'
      }}
    >
      <AuthDropdown onClose={onClose} />
    </Menu>
  </>;
}
