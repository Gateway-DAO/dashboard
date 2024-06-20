import { proof } from '@/locale/en/proof';
import { PdaStatus, ProofStatus } from '@/services/protocol-v3/types';

import { Chip, ChipProps } from '@mui/material';

type Props = {
  status: PdaStatus | ProofStatus;
  variant?: 'filled' | 'outlined';
} & Omit<ChipProps, 'label' | 'color'>;

export function TextStatusChip({
  status,
  variant = 'filled',
  ...chipProps
}: Props) {
  const labelValidProof = proof.status.up_to_date;
  const props: Pick<ChipProps, 'label' | 'color'> = {
    label:
      status === ProofStatus.Active
        ? labelValidProof
        : status?.toLocaleLowerCase(),
    color: 'success',
    ...chipProps,
  };
  if (
    status === PdaStatus.Suspended ||
    status === PdaStatus.Expired ||
    status === ProofStatus.Outdated
  ) {
    props.color = 'warning';
  }
  if (status === PdaStatus.Revoked || status === ProofStatus.Revoked) {
    props.color = 'error';
  }

  return (
    <Chip variant={variant} sx={{ textTransform: 'capitalize' }} {...props} />
  );
}
