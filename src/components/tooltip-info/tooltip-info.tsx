import { InfoOutlined } from '@mui/icons-material';
import { Tooltip, TooltipProps } from '@mui/material';

type Props = {
  title: string;
  placement?: TooltipProps['placement'];
};

export default function TooltipInfo({ title, placement = 'bottom' }: Props) {
  return (
    <Tooltip title={title} placement={placement} arrow>
      <InfoOutlined sx={{ width: 20, height: 20 }} />
    </Tooltip>
  );
}
