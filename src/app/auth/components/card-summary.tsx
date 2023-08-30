'use client';
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Typography, SxProps, Theme } from '@mui/material';

type Props = {
  title: string;
  email: string;
  onClickEdit: (value: boolean) => void;
  sxProps?: SxProps<Theme>;
};

export function CardSummary({ title, email, onClickEdit, sxProps }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap={1}
      alignItems="center"
      sx={{
        width: '100%',
        p: 2,
        backgroundColor: 'primary.main',
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        position: 'relative',
        ...sxProps,
      }}
    >
      <Stack direction="column">
        <Typography sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{email}</Typography>
      </Stack>
      <EditIcon
        onClick={() => onClickEdit(false)}
        sx={{
          color: 'text.secondary',
          cursor: 'pointer',
        }}
      />
    </Stack>
  );
}
