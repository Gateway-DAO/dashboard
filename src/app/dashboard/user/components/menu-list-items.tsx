
"use client";


import GTWMenuItem from '@/app/dashboard/components/menu-item/menu-item';


import menuItems from './menu-items';
import useUserDashboardActivePath from './use-user-dashboard-active-path';

/**
 * List all menu items of the desktop user dashboard
 */
export default function MenuListItems() {
  const activePath = useUserDashboardActivePath();

  return menuItems.map((item) => (
    <GTWMenuItem
      key={item.name}
      active={activePath === item.href}
      {...item}
    />
  )
  );
}


