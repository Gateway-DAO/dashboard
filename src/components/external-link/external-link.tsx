import Link from 'next/link';

import LaunchIcon from '@mui/icons-material/Launch';
import { Typography, SxProps, Theme, Stack } from '@mui/material';

type Props = {
  id?: string;
  text: string;
  href: string;
  size?: 'small' | 'big';
  textSxProps?: SxProps<Theme>;
  iconSxProps?: SxProps<Theme>;
};

export default function ExternalLink({
  text,
  href,
  textSxProps,
  iconSxProps,
  id,
  size = 'small',
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
            ...(size === 'big' && {
              fontSize: 16,
              fontWeight: 'normal',
              color: 'common.black',
            }),
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
            ...(size === 'big' && {
              fontSize: 20,
              color: 'common.black',
              top: 3,
            }),
            ...iconSxProps,
          }}
        />
      </Link>
    </Stack>
  );
}
