import LaunchIcon from '@mui/icons-material/Launch';
import { Stack, Link, Typography, SxProps, Theme } from '@mui/material';

type Props = {
  text: string;
  onClick: (e: any) => void;
  sxProps?: SxProps<Theme>;
  textSxProps?: SxProps<Theme>;
  id?: string;
};

export default function ExternalLink({
  text,
  onClick,
  sxProps,
  textSxProps,
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
      onClick={onClick}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 600, ...textSxProps }}
      >
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
