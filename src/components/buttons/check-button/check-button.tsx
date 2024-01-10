import { ReactNode, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props<C extends React.ElementType> = {
  isLoading?: boolean;
  isChecked?: boolean;
  isHover?: boolean;
  clickHandler?: () => any;
  labelOn?: string;
  labelOff?: string;
  labelOffHover?: string;
  component?: C;
} & ButtonProps;

export function CheckButton<C extends React.ElementType>({
  isLoading,
  isChecked,
  clickHandler,
  labelOn,
  labelOff,
  labelOffHover,
  isHover: isPropHover,
  ...other
}: Props<C>) {
  const [isHover, setIsHover] = useState(false);
  const onFocus =
    typeof isPropHover === 'undefined' ? () => setIsHover(true) : undefined;
  const onBlur =
    typeof isPropHover === 'undefined' ? () => setIsHover(false) : undefined;

  const isHoverState = isPropHover ?? isHover;

  let buttonLabel = isChecked ? labelOn : labelOff;
  if (isHoverState && isChecked && labelOffHover) {
    buttonLabel = labelOffHover;
  }

  let icon: ReactNode;
  if (isLoading) {
    icon = <CircularProgress size={18} />;
  } else if (isChecked && !isHoverState) {
    icon = <CheckCircleIcon />;
  } else if (isChecked && isHoverState) {
    icon = <CancelIcon />;
  }

  const hoverStyle = {
    borderColor: isChecked ? null : 'primary.main',
    backgroundColor: isChecked ? 'primary.main' : 'primary.light',
  };

  return (
    <Button
      onClick={clickHandler}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      startIcon={icon}
      {...other}
      disableRipple={!!other.component}
      sx={{
        ...other?.sx,
        background: isChecked ? 'success.main' : 'primary.light',
        border: '1px solid',
        borderColor: isChecked ? 'transparent' : 'primary.main',
        color: isChecked ? '#170627' : 'primary.main',
        ...(isHoverState && {
          ...hoverStyle,
          '&:hover': hoverStyle,
        }),
      }}
    >
      {buttonLabel}
    </Button>
  );
}
