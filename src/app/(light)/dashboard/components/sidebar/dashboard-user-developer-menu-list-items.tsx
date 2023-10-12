'use client';

import { usePathname } from 'next/navigation';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Typography } from '@mui/material';

import GTWMenuItem from '../menu-item/menu-item';
import { dashboardDevelopersMenuItems } from './dashboard-user-developer-menu-items';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

  return (
    <>
      <Typography
        variant="caption"
        sx={{ px: CONTAINER_PX, mx: -2.5, mb: 2, display: 'block' }}
      >
        Developers
      </Typography>
      {dashboardDevelopersMenuItems.map(({ activeHrefs, ...item }) => (
        <GTWMenuItem
          key={item.name}
          active={activeHrefs.some((path) => activePath.includes(path))}
          {...item}
        />
      ))}
    </>
  );
}
