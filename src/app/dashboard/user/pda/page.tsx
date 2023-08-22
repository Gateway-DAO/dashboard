import { Suspense } from "react";

import ErrorBoundary from "@/components/error-boundary/error-boundary";

import { Typography } from "@mui/material";

import PDAsList from "./components/list";

export default function PDAsPage() {
  return (<>
    <Typography>
      List PDAS:
    </Typography>
    <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <PDAsList />
      </Suspense>
    </ErrorBoundary>
  </>)
}
