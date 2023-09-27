'use client';

import { usePathname } from 'next/navigation';

import GTWMenuItem from '@/app/(light)/dashboard/components/menu-item/menu-item';

import dashboardUserMenuItems from './dashboard-user-menu-items';

/**
 * List all menu items of the desktop user dashboard
 */
export default function DashboardUserMenuListItems() {
  const activePath = usePathname();

  return dashboardUserMenuItems.map(({ activeHrefs, ...item }) => (
    <GTWMenuItem
      key={item.name}
      active={activeHrefs.some((path) => activePath.includes(path))}
      {...item}
    />
  ));
}
