import Link from "next/link";
import { FC } from "react";

import { ListItem, ListItemButton, ListItemButtonProps, SvgIconProps, Typography } from "@mui/material";



export type GTWMenuItemProps = {
  name: string;
  href: string;
  active?: boolean;
  icon: FC<SvgIconProps>;
} & ListItemButtonProps;

export default function GTWMenuItem({ icon: Icon, href, name, active, ...props }: GTWMenuItemProps) {
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        component={Link}
        href={href}
        underline={'none'}
        sx={{
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          direction: 'row',
          gap: 2,
          px: 2.5,
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
        {...props}
      >
        <Icon sx={{ fontSize: 32 }} />
        <Typography
          component={'span'}
          variant="subtitle1"
          sx={{ fontSize: '1rem' }}
        >
          {name}
        </Typography>
      </ListItemButton>
    </ListItem>
  )
}
