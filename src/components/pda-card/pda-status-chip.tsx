import { proof } from '@/locale/en/proof';
import { CredentialStatus } from '@/services/protocol/types';

import { Chip, ChipProps } from '@mui/material';

type Props = {
  status: CredentialStatus;
  isProof?: boolean;
} & Omit<ChipProps, 'label' | 'color'>;

export function PDAStatusChip({
  status,
  isProof = false,
  ...chipProps
}: Props) {
  const labelValidProof = proof.status.up_to_date;
  const props: Pick<ChipProps, 'label' | 'color'> = {
    label:
      isProof && status === CredentialStatus.Valid
        ? labelValidProof
        : status?.toLocaleLowerCase(),
    color: 'success',
    ...chipProps,
  };
  if (status === CredentialStatus.Expired) {
    props.color = 'warning';
  }
  if (status === CredentialStatus.Invalid) {
    props.color = 'error';
  }
  if (status === CredentialStatus.Revoked) {
    props.color = 'error';
  }
  if (status === CredentialStatus.Suspended) {
    props.color = 'warning';
  }

  return <Chip sx={{ textTransform: 'capitalize' }} {...props} />;
}
