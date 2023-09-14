import { proof } from '@/locale/en/proof';
import { PdaStatus } from '@/services/protocol/types';

import { Chip, ChipProps } from '@mui/material';

type Props = {
  status: PdaStatus;
  variant?: 'filled' | 'outlined';
  isProof?: boolean;
} & Omit<ChipProps, 'label' | 'color'>;

export function PDAStatusChip({
  status,
  isProof = false,
  variant = 'filled',
  ...chipProps
}: Props) {
  const labelValidProof = proof.status.up_to_date;
  const props: Pick<ChipProps, 'label' | 'color'> = {
    label:
      isProof && status === PdaStatus.Valid
        ? labelValidProof
        : status?.toLocaleLowerCase(),
    color: 'success',
    ...chipProps,
  };
  if (status === PdaStatus.Expired) {
    props.color = 'warning';
  }
  if (status === PdaStatus.Revoked) {
    props.color = 'error';
  }
  if (status === PdaStatus.Suspended) {
    props.color = 'warning';
  }

  return (
    <Chip variant={variant} sx={{ textTransform: 'capitalize' }} {...props} />
  );
}
