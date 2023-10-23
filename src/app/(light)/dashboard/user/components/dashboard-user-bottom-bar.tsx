'use client';
import React from 'react';

import MenuBottomListItems from '../../components/menu-bottom-list-items';
import { dashboardDevelopersMenuItems } from './dashboard-user-developer-menu-items';
import dashboardUserMenuItems from './dashboard-user-menu-items';

export default function DashboardUserBottomBar() {
  return (
    <MenuBottomListItems
      menuItems={dashboardUserMenuItems}
      developerItems={dashboardDevelopersMenuItems}
    />
  );
}
