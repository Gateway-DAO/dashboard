import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = {
  isLoading?: boolean;
  loadingSize?: number;
} & ButtonProps;

export function LoadingButton({
  isLoading,
  loadingSize = 20,
  disabled,
  ...other
}: Props) {
  return (
    <Button
      disabled={isLoading || disabled}
      {...other}
      variant="outlined"
      color="info"
    >
      {isLoading ? <CircularProgress size={loadingSize} /> : other.children}
    </Button>
  );
}
