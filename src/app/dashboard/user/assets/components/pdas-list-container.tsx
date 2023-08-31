"use client";

import { PropsWithChildren } from "react";

import { Stack } from "@mui/material";

export default function PDAsListContainer({ children }: PropsWithChildren) {
  return <Stack gap={1} direction="row" flexWrap="wrap" sx={(theme) => ({
    "> *": {
      flexBasis: {
        xs: "100%",
        sm: `calc(50% - ${theme.spacing(1)})`,
        md: `calc(33.33% - ${theme.spacing(1)})`,
      },
    }
  })}>
    {children}
  </Stack>
}
