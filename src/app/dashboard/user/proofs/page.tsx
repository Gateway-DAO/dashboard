import Link from "next/link";

import routes from "@/constants/routes";

import { Typography } from "@mui/material";

export default function DashboardUserProofsPage() {
  return <>
    <Typography variant="h3">Proofs</Typography>
    <Link href={routes.dashboardUserProof.replace("[id]", "mock")}>Open proof</Link>
  </>
}
