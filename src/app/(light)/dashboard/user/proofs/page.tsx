import Link from "next/link";

import routes from "@/constants/routes";

import { Stack } from '@mui/material';

import { TableSharedDataAssets } from './components/table-shared';

export default function DashboardUserProofsPage() {
  return (
    <Stack>
      <TableSharedDataAssets />
      <Link href={routes.dashboardUserProof.replace("[id]", "mock")}>Open proof</Link>
    </Stack>
  );
}
