import Link from 'next/link';

import { Tab } from '@mui/material';

export type GTWTabProps = {
  label: string;
  href: string;
  parallelRoutesKey?: string;
};

export default function GTWTab({ label, href }: GTWTabProps) {
  return <Tab label={label} component={Link} href={href} passHref />;
}
