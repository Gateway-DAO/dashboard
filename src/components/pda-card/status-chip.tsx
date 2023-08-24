import { CredentialStatus } from '@/services/protocol/types';

import { Chip, ChipProps } from '@mui/material';

import { PdaCardProps } from './type';

export function StatusChip({ status }: Pick<PdaCardProps, "status">) {
  const props: Pick<ChipProps, "label" | "color"> = {
    label: status.toLocaleLowerCase(),
    color: "success"
  };
  if (status === CredentialStatus.Expired) {
    props.color = "warning";
  }
  if (status === CredentialStatus.Invalid) {
    props.color = "error";
  }
  if (status === CredentialStatus.Revoked) {
    props.color = "warning";
  }
  if (status === CredentialStatus.Suspended) {
    props.color = "warning";
  }


  return <Chip variant="outlined" {...props} />;
}
