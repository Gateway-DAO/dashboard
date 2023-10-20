'use client';

import { usePathname } from 'next/navigation';

import { Typography } from '@mui/material';

import GTWMenuItem from '../../components/menu-item/menu-item';
import { dashboardDevelopersMenuItems } from './dashboard-user-developer-menu-items';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

  return (
    <>
      <Typography variant="caption" sx={{ px: 3.5, mb: 2, display: 'block' }}>
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
