'use client';

import { usePathname } from 'next/navigation';

import { currentEnv } from '@/utils/env';

import { List, Typography } from '@mui/material';

import { dashboardDevelopersMenuItems } from './dashboard-developer-menu-items';
import GTWMenuItem from './menu-item';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

  if (currentEnv === 'production') {
    return null;
  }

  return (
    <>
      <Typography variant="caption" sx={{ display: 'block', pl: 1 }}>
        Developers
      </Typography>
      <List
        component="ul"
        sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      >
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
      </List>
      <Typography variant="caption" sx={{ mt: 2, display: 'block', pl: 1 }}>
        Other Tools
      </Typography>
      <List
        component="ul"
        sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      >
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
      </List>
    </>
  );
}
