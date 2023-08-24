import { CredentialStatus } from '@/services/protocol/types';

import { Chip, ChipProps } from '@mui/material';

type Props = {
  status: CredentialStatus;
} & Omit<ChipProps, "label" | "color">;

export function PDAStatusChip({ status, ...chipProps }: Props) {
  const props: Pick<ChipProps, "label" | "color"> = {
    label: status.toLocaleLowerCase(),
    color: "success",
    ...chipProps
  };
  if (status === CredentialStatus.Expired) {
    props.color = "warning";
  }
  if (status === CredentialStatus.Invalid) {
    props.color = "error";
  }
  if (status === CredentialStatus.Revoked) {
    props.color = "error";
  }
  if (status === CredentialStatus.Suspended) {
    props.color = "warning";
  }


  return <Chip {...props} />;
}
