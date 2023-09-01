import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { LinkProps as MuiLinkProps, Link as MuiLink } from '@mui/material';
// combine MUI LinkProps with NextLinkProps
type CombinedLinkProps = MuiLinkProps<typeof NextLink>;
// remove both href properties
// and define a new href property using NextLinkProps
export type GTWLinkProps = Omit<CombinedLinkProps, 'href'> & {
  href: NextLinkProps['href'];
};

function GTWLink({ ...props }: GTWLinkProps) {
  // use _href props of CustomNextLink to set the href
  return <MuiLink {...props} component={NextLink} />;
}
export default GTWLink;
