import { InfoOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

type Props = {
  title: string;
  placement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
};

export default function TooltipInfo({ title, placement = 'bottom' }: Props) {
  return (
    <Tooltip title={title} placement={placement} arrow>
      <InfoOutlined sx={{ width: 20, height: 20 }} />
    </Tooltip>
  );
}
