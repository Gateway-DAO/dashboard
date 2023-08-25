
"use client";


import { usePathname } from 'next/navigation';

import GTWMenuItem from '@/app/dashboard/components/menu-item/menu-item';


import dashboardOrgMenuItems from './dashboard-org-menu-items';

/**
 * List all menu items of the desktop org dashboard
 */
export default function DashboardOrgMenuListItems() {
  const activePath = usePathname();

  return dashboardOrgMenuItems.map((item) => (
    <GTWMenuItem
      key={item.name}
      active={activePath === item.href}
      {...item}
    />
  )
  );
}


