
import { Card, Skeleton, Stack } from "@mui/material";

import { PdaCardProps } from "./type";

export default function PdaCardSkeleton({ dashed }: Pick<PdaCardProps, "dashed">) {
  return (
    <Stack
      component={Card}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      variant="outlined"
      gap={1}
      sx={{
        ...(dashed && { borderStyle: 'dashed' }),
        width: '100%',
      }}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{
          px: 2,
          pt: 2,
          pb: 3,
          height: '100%',
          gap: 2,
          width: '100%',
        }}
      >
        <Stack alignItems="flex-start" sx={{ width: "100%" }} >
          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3, width: "100%" }}>
            <Skeleton
              variant="circular"
              sx={{ width: 32, height: 32, flexShrink: 0 }}
            />
            <Skeleton
              variant="text"
              sx={{ flexGrow: .5 }}
            />
          </Stack>
          <Skeleton
            variant="text"
            sx={{ width: "100%" }}
          />
        </Stack>
        <Skeleton
          variant="rounded"
          sx={{ width: 75, height: 32 }}
        />
      </Stack>
    </Stack>
  );
}
