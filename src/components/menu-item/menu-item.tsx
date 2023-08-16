import { FC } from "react";

import { ListItem, SvgIconProps, Typography } from "@mui/material";

import GTWLink from "../gtw-link";


export interface GTWMenuItemProps {
  name: string;
  link: string;
  active?: boolean;
  icon: FC<SvgIconProps>;
}

export default function GTWMenuItem({ icon: Icon, link, name, active }: GTWMenuItemProps) {
  return (
    <ListItem sx={{ pl: 0 }}>
      <GTWLink
        href={link}
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
