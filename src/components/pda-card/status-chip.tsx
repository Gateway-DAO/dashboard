import { pda } from '@/locale/en/pda';

import { Chip, ChipProps } from '@mui/material';

import { PdaCardProps } from './type';

export function StatusChip({ status }: Pick<PdaCardProps, "status">) {
  let props: Pick<ChipProps, "label" | "color"> = {
    label: pda.status.valid,
    color: "success"
  };
  if (status === "expired") {
    props = {
      label: pda.status.expired,
      color: "error"
    };
  }
  if (status === "revoked") {
    props = {
      label: pda.status.revoked,
      color: "warning"
    };
  }

  return <Chip variant="outlined" {...props} />;
}
