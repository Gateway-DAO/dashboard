import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';

export interface ChipProps extends MuiChipProps {}
const Chip = ({ ...rest }: ChipProps) => <MuiChip {...rest} />;

export default Chip;
