import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { LinkProps as MuiLinkProps, Link as MuiLink } from "@mui/material";
// Defining the CustomNextLink
export type CustomNextLinkProps = Omit<NextLinkProps, "href"> & {
  _href: NextLinkProps["href"];
};
export const CustomNextLink = ({ _href, ...props }: CustomNextLinkProps) => {
  return <NextLink href={_href} {...props} />;
};
// combine MUI LinkProps with NextLinkProps
type CombinedLinkProps = MuiLinkProps<typeof NextLink>;
// remove both href properties
// and define a new href property using NextLinkProps
type GTWLinkProps = Omit<CombinedLinkProps, "href"> & {
  href: NextLinkProps["href"];
};

const GTWLink = ({ href, ...props }: GTWLinkProps) => {
  // use _href props of CustomNextLink to set the href
  return <MuiLink {...props} component={CustomNextLink} _href={href} />;
};
export default GTWLink;
