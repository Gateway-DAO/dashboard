import { brandColors } from '@/theme/config/brand';

import { Button, ButtonProps, alpha } from '@mui/material';

export default function WalletModalButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '.MuiButton-startIcon': {
          m: 0,
          mb: 1,
        },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        px: 2,
        py: 4,
        width: '100%',
        backgroundColor: alpha(brandColors.primary, 0.08),
        ...props.sx,
      }}
    />
  );
}
