import { theme } from '@/theme';

import LaunchIcon from '@mui/icons-material/Launch';
import { Stack, Link, Typography, alpha, SxProps, Theme } from '@mui/material';

type Props = {
  text: string;
  handleClick: (e: any) => void;
  sxProps?: SxProps<Theme>;
  id?: string;
};

export default function ExternalLink({
  text,
  handleClick,
  sxProps,
  id,
}: Props) {
  return (
    <Link
      component={Stack}
      gap={1}
      direction="row"
      alignItems="center"
      sx={{
        textDecoration: 'none',
        position: 'relative',
        cursor: 'pointer',
        zIndex: 1,
        ...sxProps,
      }}
      id={id}
      onClick={handleClick}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {text}
      </Typography>
      <LaunchIcon
        sx={{
          color: 'text.disabled',
          fontSize: 'body2.fontSize',
        }}
      />
    </Link>
  );
}
