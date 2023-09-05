import './button.css';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

export type ButtonProps = MUIButtonProps;

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  children,
  ...props
}: ButtonProps) => {
  return (
    <MUIButton
      {...props}
    >
      {children}
    </MUIButton>
  );
};
