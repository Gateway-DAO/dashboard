
"use client";


import { usePathname } from 'next/navigation';

import GTWMenuItem from '@/app/dashboard/components/menu-item/menu-item';


import dashboardUserMenuItems from './dashboard-user-menu-items';

/**
 * List all menu items of the desktop user dashboard
 */
export default function MenuListItems() {
  const activePath = usePathname();

  return dashboardUserMenuItems.map((item) => (
    <GTWMenuItem
      key={item.name}
      active={activePath === item.href}
      {...item}
    />
  )
  );
}


