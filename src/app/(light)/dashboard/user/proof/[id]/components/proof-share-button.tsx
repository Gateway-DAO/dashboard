"use client";

import { common } from "@/locale/en/common";

import { Button } from "@mui/material";

type Props = {
  proof: any; // TODO: Add type
}

export default function ProofShareButton({ }: Props) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        mb: 2,
        width: '100%',
        fontWeight: 700,
        fontSize: 13,
      }}
      onClick={() => console.log('test')} // TODO: Add action
    >
      {common.actions.share_a_copy}
    </Button>
  )
}
