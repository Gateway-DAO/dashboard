import { brandColors } from '@/theme/config/brand';

import { Button, ButtonProps, alpha } from '@mui/material';

export default function WalletModalButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'row',
          sm: 'column',
        },
        justifyContent: {
          xs: 'flex-start',
          sm: 'center',
        },
        '.MuiButton-startIcon': {
          m: 0,
          mr: {
            xs: 2,
            sm: 0,
          },
          mb: {
            xs: 0,
            sm: 1,
          },
        },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        px: 2,
        py: {
          xs: 2,
          sm: 4,
        },
        width: '100%',
        backgroundColor: alpha(brandColors.primary, 0.08),
        ...props.sx,
      }}
    />
  );
}
