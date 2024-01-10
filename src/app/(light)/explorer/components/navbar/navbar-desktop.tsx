'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Link as MuiLink, Stack } from '@mui/material';

import explorerMenuItems from './menu-items';

export default function ExplorerNavbarDesktop() {
  const activePath = usePathname();

  return (
    <Stack
      direction="row"
      gap={2}
      flexGrow={1}
      sx={{
        display: {
          xs: 'none',
          lg: 'flex',
        },
      }}
    >
      {explorerMenuItems.map(
        (
          { icon: Icon, activeIcon: ActiveIcon, activeHrefs, ...item },
          index
        ) => {
          const isActive = activeHrefs.some((path) =>
            activePath.includes(path)
          );
          return (
            <MuiLink
              key={index}
              component={Link}
              href={item.href}
              target={item.externalLink ? '_blank' : '_self'}
              color="common.black"
              underline="hover"
              fontWeight="700"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {item.name}
              {isActive && ActiveIcon ? (
                <ActiveIcon />
              ) : (
                Icon && <Icon sx={{ ml: 1 }} />
              )}
            </MuiLink>
          );
        }
      )}
    </Stack>
  );
}
