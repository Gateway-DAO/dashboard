import { FC } from "react";

import { ListItem, SvgIconProps, Typography } from "@mui/material";

import GTWLink from "../../../../components/gtw-link";


export interface GTWMenuItemProps {
  name: string;
  href: string;
  active?: boolean;
  icon: FC<SvgIconProps>;
}

export default function GTWMenuItem({ icon: Icon, href, name, active }: GTWMenuItemProps) {
  return (
    <ListItem sx={{ pl: 0 }}>
      <GTWLink
        href={href}
        underline={'none'}
        sx={{
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          direction: 'row',
          gap: 2,
          ':hover': {
            svg: {
              color: 'primary.main',
            },
            span: {
              color: 'black',
            },
          },
          ...(active && {
            color: 'black',
            svg: {
              color: 'primary.main',
            }
          })
        }}
      >
        <Icon sx={{ fontSize: 32 }} />
        <Typography
          component={'span'}
          variant="subtitle1"
          sx={{ fontSize: '1rem' }}
        >
          {name}
        </Typography>
      </GTWLink>
    </ListItem>
  )
}
