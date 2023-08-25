"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import { Link } from "@mui/material";

export default function LogoContainer({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isOrg = pathname.includes("/dashboard/org/");
  let link = "/dashboard/user/";
  if (isOrg) {
    const orgName = pathname.split("/")[3];
    link = `/dashboard/org/${orgName}`;
  }

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
