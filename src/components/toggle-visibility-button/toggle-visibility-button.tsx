'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, ButtonProps } from '@mui/material';

type Props = {
  isVisible: boolean;
  onToggle: () => void;
};

export default function ToggleVisibilityButton({
  isVisible,
  onToggle,
  ...props
}: Props & Omit<ButtonProps, 'onClick'>) {
  return (
    <Button
      onClick={onToggle}
      startIcon={isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      variant="outlined"
      {...props}
    >
      {isVisible ? 'hide' : 'show'}
    </Button>
  );
}
