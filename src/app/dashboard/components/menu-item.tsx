import Link from 'next/link';
import { FC } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { OpenInNew } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  Stack,
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
          color: 'text.secondary',
          pl: {
            xs: CONTAINER_PX.xs - 0.5,
            md: CONTAINER_PX.md - 0.5,
            lg: 2,
          },
          pr: 1.5,
          py: 0,
          ':hover': {
            svg: {
              color: 'primary.main',
            },
            span: {
              color: 'primary.main',
            },
          },

          ...props.sx,
        }}
      >
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          sx={{
            width: '100%',
            p: 1,

            ...(active && {
              color: 'primary.main',
              backgroundColor: 'primary.light',
              borderRadius: '16px',
              svg: {
                color: 'primary.main',
              },
            }),
          }}
        >
          {active && ActiveIcon ? (
            <ActiveIcon sx={{ fontSize: 32 }} />
          ) : (
            Icon && <Icon sx={{ fontSize: 32 }} />
          )}
          <Typography
            component={'span'}
            variant="subtitle1"
            sx={{ fontSize: '1rem', flexGrow: 1 }}
          >
            {name}
          </Typography>
          {externalLink && <OpenInNew sx={{ ml: 2, mr: 1 }} />}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
