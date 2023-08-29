"use client"

import DefaultError from "@/components/default-error/default-error"
import useOrganization from "@/hooks/use-organization"

export default function DashboardOrgErrorPage() {
  const { pathnameOrg } = useOrganization()
  return <DefaultError href={`/dashboard/org/${pathnameOrg}`} />
}
