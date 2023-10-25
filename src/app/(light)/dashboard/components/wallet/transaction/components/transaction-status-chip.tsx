'use client';

import { FileDownloadOutlined, FileUploadOutlined } from '@mui/icons-material';
import { Chip, ChipProps } from '@mui/material';

type Props = {
  status: 'earning' | 'expense';
  variant?: 'filled' | 'outlined';
} & Omit<ChipProps, 'label' | 'color' | 'icon'>;

export default function TransactionStatusChip({
  status,
  variant,
  ...chipProps
}: Props) {
  const props: Pick<ChipProps, 'label' | 'color' | 'icon'> = {
    label: status?.toLocaleLowerCase(),
    color: 'success',
    icon: <FileDownloadOutlined />,
    ...chipProps,
  };
  if (status === 'expense') {
    props.color = 'error';
    props.icon = <FileUploadOutlined />;
  }
  return (
    <>
      <Chip variant={variant} sx={{ textTransform: 'capitalize' }} {...props} />
    </>
  );
}
