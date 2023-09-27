import Link from 'next/link';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, IconButtonProps } from '@mui/material';

export type CloseButtonProps = {
  href?: string;
  onClick?: () => void;
} & Omit<IconButtonProps, 'onClick'>;

const sx = {
  width: 40,
  height: 40,
  cursor: 'pointer',
  background: 'rgba(0, 0, 0, 0.08)',
};

export default function CloseButton({ href, ...props }: CloseButtonProps) {
  return (
    <IconButton
      {...props}
      {...(href ? { component: Link, href } : {})}
      sx={{
        ...sx,
        ...props.sx,
      }}
    >
      <CloseIcon />
    </IconButton>
  );
}
