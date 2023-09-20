import Link from 'next/link';

import LaunchIcon from '@mui/icons-material/Launch';
import { Typography, SxProps, Theme, Stack } from '@mui/material';

type Props = {
  text: string;
  href: string;
  textSxProps?: SxProps<Theme>;
  iconSxProps?: SxProps<Theme>;
  id?: string;
};

export default function ExternalLink({
  text,
  href,
  textSxProps,
  iconSxProps,
  id,
}: Props) {
  return (
    <Stack sx={{ pr: 1 }}>
      <Link id={id} passHref href={href} style={{ textDecoration: 'none' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textDecoration: 'none',
            ...textSxProps,
          }}
        >
          {text}
        </Typography>
        <LaunchIcon
          sx={{
            color: 'text.disabled',
            fontSize: 'body2.fontSize',
            position: 'relative',
            top: 2,
            left: 8,
            ...iconSxProps,
          }}
        />
      </Link>
    </Stack>
  );
}
