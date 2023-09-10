"use client"

import DefaultError from "@/components/default-error/default-error"
import routes from "@/constants/routes"

export default function DashboardUserErrorPage() {
  return <DefaultError href={routes.dashboardUserHome} />
}
