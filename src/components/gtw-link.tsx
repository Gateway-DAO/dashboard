import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Ref, forwardRef } from "react";

import { LinkProps as MuiLinkProps, Link as MuiLink } from "@mui/material";
// Defining the CustomNextLink
export type CustomNextLinkProps = Omit<NextLinkProps, "href"> & {
  _href: NextLinkProps["href"];
};
export const CustomNextLink = forwardRef(function CustomNextLink({ _href, ...props }: CustomNextLinkProps, ref: any) {
  return <NextLink href={_href} {...props} ref={ref} />;
});
// combine MUI LinkProps with NextLinkProps
type CombinedLinkProps = MuiLinkProps<typeof NextLink>;
// remove both href properties
// and define a new href property using NextLinkProps
export type GTWLinkProps = Omit<CombinedLinkProps, "href"> & {
  href: NextLinkProps["href"];
};

const GTWLink = forwardRef(function GTWLink({ href, ...props }: GTWLinkProps, ref) {
  // use _href props of CustomNextLink to set the href
  return <MuiLink ref={ref} {...props} component={CustomNextLink} _href={href} />;
});
export default GTWLink;
