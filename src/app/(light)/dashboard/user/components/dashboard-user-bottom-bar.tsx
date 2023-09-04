"use client";
import React from "react";

import MenuBottomListItems from "../../components/menu-bottom-list-items";
import dashboardUserMenuItems from "./dashboard-user-menu-items";


export default function DashboardUserBottomBar() {
  return <MenuBottomListItems menuItems={dashboardUserMenuItems} />
}
