import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

type Props = {
  active: boolean;
} & SvgIconProps;

export default function ToggleDropIcon({ active, ...props }: Props) {
  return active ? <ArrowDropUp {...props} /> : <ArrowDropDown {...props} />;
}
