import { Link } from '@mui/material';

type Props = {
  href: string;
};

export function LinkView({ href }: Props) {
  return (
    <Link sx={{ textDecoration: 'none' }} href={href} target="_blank">
      {href}
    </Link>
  );
}
