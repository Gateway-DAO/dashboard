"use client"

import DefaultError from "@/components/default-error/default-error"
import routes from "@/constants/routes"
import useOrganization from "@/hooks/use-organization"

export default function DashboardOrgErrorPage() {
  const { pathnameOrg } = useOrganization()
  return <DefaultError href={routes.dashboardOrgHome(pathnameOrg!)} />
}
