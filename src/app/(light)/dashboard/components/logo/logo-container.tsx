"use client";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

import routes from "@/constants/routes";
import useOrganization from "@/hooks/use-organization";

import { Link } from "@mui/material";

export default function LogoContainer({ children }: PropsWithChildren) {
  const { isOrg, pathnameOrg } = useOrganization();
  const link = isOrg ? routes.dashboardOrgHome(pathnameOrg) : routes.dashboardUserHome;


  return (
    <Link
      component={NextLink}
      sx={{ flexDirection: 'row', display: 'flex', textDecoration: 'none' }}
      href={link}
      alignItems={'center'}
    >
      {children}
    </Link>
  )
}
