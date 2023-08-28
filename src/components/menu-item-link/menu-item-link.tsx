import { PropsWithChildren } from "react";

import { MenuItem, MenuItemProps } from "@mui/material";

import GTWLink, { GTWLinkProps } from "../gtw-link";

type Props = {
  href: string;
  linkProps?: Omit<GTWLinkProps, "href">;
} & MenuItemProps

/**
 * Menu Item with link
 */
export default function MenuItemLink({
  href,
  linkProps,
  children,
  ...props
}: PropsWithChildren<Props>) {

  return (
    <MenuItem sx={{ p: 0 }} {...props}>
      <GTWLink href={href} sx={{ px: 2, py: 8 / 6, display: "flex", width: "100%", textDecoration: "none" }} {...linkProps}>
        {children}
      </GTWLink>
    </MenuItem >
  )
}
