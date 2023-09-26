import { request } from '@/locale/en/request';
import { DataResourceStatus } from '@/services/protocol/types';

import { Chip, ChipProps } from '@mui/material';

type Props = {
  status: DataResourceStatus;
  variant?: 'filled' | 'outlined';
  isProof?: boolean;
} & Omit<ChipProps, 'label' | 'color'>;

export default function RequestStatusChip({
  status,
  variant = 'outlined',
  ...props
}: Props) {
  let label: string = '';
  let color: ChipProps['color'] = 'default';
  switch (status) {
    case DataResourceStatus.Accepted:
      color = 'success';
      label = request.status.accepted;
      break;
    case DataResourceStatus.Expired:
      color = 'warning';
      label = request.status.expired;
      break;
    case DataResourceStatus.Rejected:
      color = 'error';
      label = request.status.rejected;
      break;
    case DataResourceStatus.Pending:
      color = 'warning';
      label = request.status.pending;
      break;
    default:
      break;
  }

  return (
    <Chip
      variant={variant}
      sx={{ textTransform: 'capitalize' }}
      color={color}
      label={label}
      {...props}
    />
  );
}
