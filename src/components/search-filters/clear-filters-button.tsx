import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
  onClear: () => void;
};

export default function ClearFiltersButton({ onClear }: Props) {
  return (
    <Button
      onClick={onClear}
      startIcon={<Close />}
      variant="outlined"
      color="inherit"
      sx={{
        order: {
          xs: 999,
          lg: 'unset',
        },
        borderWidth: {
          xs: 1,
          lg: 0,
        },
      }}
      size="large"
    >
      {'Clear filters'}
    </Button>
  );
}
