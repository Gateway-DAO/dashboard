"use client";

import { ReactNode } from "react";

import { useMenu } from "@/hooks/use-menu";

import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";

type Props = {
  menuItems?: ReactNode;
}

export default function AliasMenuButton({ menuItems }: Props) {
  const { element, isOpen, onClose, onOpen } = useMenu()
  return <>
    <IconButton onClick={onOpen}>
      <MoreVert />
    </IconButton>
    <Menu anchorEl={element} open={isOpen} onClose={onClose}>
      {menuItems}
    </Menu>
  </>;
}
