import Link from 'next/link';
import { FC } from 'react';

import { OpenInNew } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  SvgIconProps,
  Typography,
} from '@mui/material';

type Props = {
  name: string;
  href: string;
  active?: boolean;
  icon?: FC<SvgIconProps>;
  activeIcon?: FC<SvgIconProps>;
  navbar?: boolean;
  externalLink?: boolean;
  hide?: boolean;
};

export type GTWMenuItemSettings = Props & {
  activeHrefs: string[];
};

export default function GTWMenuItem({
  icon: Icon,
  href,
  name,
  active,
  externalLink,
  activeIcon: ActiveIcon,
  navbar: _navbar,
  ...props
}: Props & ListItemButtonProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={href}
        target={externalLink ? '_blank' : '_self'}
        underline={'none'}
        {...props}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: 'text.secondary',
          p: 1,
          borderRadius: 1,
          gap: 2,
          ':hover, :focus': {
            svg: {
              color: 'primary.dark',
            },
            span: {
              color: 'primary.dark',
            },
          },
          ...(active && {
            color: 'primary.dark',
            backgroundColor: 'primary.100',
            svg: {
              color: 'primary.dark',
            },
          }),
          ...props.sx,
        }}
      >
        {active && ActiveIcon ? (
          <ActiveIcon sx={{ fontSize: 24 }} />
        ) : (
          Icon && <Icon sx={{ fontSize: 24 }} />
        )}
        <Typography component={'span'} variant="subtitle1" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>
        {externalLink && <OpenInNew sx={{ ml: 2, mr: 1 }} />}
      </ListItemButton>
    </ListItem>
  );
}
