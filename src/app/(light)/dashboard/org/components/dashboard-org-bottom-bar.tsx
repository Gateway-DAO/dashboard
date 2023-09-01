"use client";
import { usePathname } from "next/navigation";
import React from "react";


import MenuBottomListItems from "../../components/menu-bottom-list-items";
import dashboardOrgMenuItems from "./dashboard-org-menu-items";


export default function DashboardOrgBottomBar() {
  const bottomItems = [dashboardOrgMenuItems[0], dashboardOrgMenuItems[3]];
  const innerMenuItems = dashboardOrgMenuItems.filter(item => !bottomItems.some(i => i.href === item.href));
  const activePath = usePathname();

  return <MenuBottomListItems activePath={activePath} bottomItems={bottomItems} menuItems={innerMenuItems} />
}
