"use client";
import { usePathname } from "next/navigation";
import React from "react";


import MenuBottomListItems from "../../components/menu-bottom-list-items";
import dashboardUserMenuItems from "./dashboard-user-menu-items";


export default function DashboardUserBottomBar() {
  const bottomItems = [dashboardUserMenuItems[0], dashboardUserMenuItems[3]];
  const innerMenuItems = dashboardUserMenuItems.filter(item => !bottomItems.some(i => i.href === item.href));
  const activePath = usePathname();

  return <MenuBottomListItems activePath={activePath} bottomItems={bottomItems} menuItems={innerMenuItems} />
}
