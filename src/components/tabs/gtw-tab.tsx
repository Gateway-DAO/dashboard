import Link from 'next/link';

import { Tab, TabProps } from '@mui/material';

export type GTWTabProps = {
  label: string;
  href: string;
  parallelRoutesKey?: string;
} & TabProps;

export default function GTWTab({ label, href, ...props }: GTWTabProps) {
  return <Tab label={label} component={Link} href={href} passHref {...props} />;
}
