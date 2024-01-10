import { Chip, Stack, Tooltip, Typography } from '@mui/material';

type Props = {
  label: string;
  value: string;
  helperText?: string;
  chip?: string;
};

export function SharingCost({ label, value, helperText, chip }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        backgroundColor: 'grey.100',
        borderRadius: 1,
      }}
    >
      <Stack>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography
          fontSize={24}
          sx={{ textDecoration: chip && helperText ? 'line-through' : 'none' }}
        >
          {value}
        </Typography>
      </Stack>
      {chip && helperText && (
        <Tooltip title={helperText} arrow>
          <Chip label={chip} color="success" />
        </Tooltip>
      )}
    </Stack>
  );
}
