"use client";
import React, { useMemo } from "react";

import useOrganization from "@/hooks/use-organization";

import MenuBottomListItems from "../../components/menu-bottom-list-items";
import dashboardOrgMenuItems from "./dashboard-org-menu-items";

export default function DashboardOrgBottomBar() {
  const { pathnameOrg } = useOrganization();
  const menuItems = useMemo(() => pathnameOrg ? dashboardOrgMenuItems(pathnameOrg) : undefined, [pathnameOrg]);
  if (!menuItems) return null;
  return <MenuBottomListItems menuItems={menuItems} />
}
