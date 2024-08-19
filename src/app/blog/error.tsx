"use client";

import DefaultError from "@/components/default-error/default-error";

import { Box } from "@mui/material";

export default function Error({
  error: _error,
  reset: _reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box margin={10}>
      <DefaultError />
    </Box>
  );
}
