'use client';

import { usePathname } from 'next/navigation';

import { currentEnv } from '@/utils/env';

import { Typography } from '@mui/material';

import { dashboardDevelopersMenuItems } from './dashboard-developer-menu-items';
import GTWMenuItem from './menu-item';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

  if (currentEnv === 'production') {
    return null;
  }

  return (
    <>
      <Typography variant="caption" sx={{ px: 3.5, mb: 2, display: 'block' }}>
        Developers
      </Typography>

      {dashboardDevelopersMenuItems.map(
        ({ activeHrefs, ...item }, index) =>
          index <= 1 && (
            <GTWMenuItem
              key={item.name}
              active={activeHrefs.some((path) => activePath.includes(path))}
              {...item}
            />
          )
      )}

      <Typography
        variant="caption"
        sx={{ px: 3.5, mt: 2, mb: 2, display: 'block' }}
      >
        Other Tools
      </Typography>

      {dashboardDevelopersMenuItems.map(
        ({ activeHrefs, ...item }, index) =>
          index === 2 && (
            <GTWMenuItem
              key={item.name}
              active={activeHrefs.some((path) => activePath.includes(path))}
              {...item}
            />
          )
      )}
    </>
  );
}
