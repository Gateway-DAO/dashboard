'use client';
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Typography, SxProps, Theme, IconButton } from '@mui/material';

type Props = {
  title: string;
  email: string;
  onClickEdit: (value: boolean) => void;
  sx?: SxProps<Theme>;
};

export function CardSummary({ title, email, onClickEdit, sx }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap={1}
      alignItems="center"
      sx={{
        width: '100%',
        p: 2,
        pr: 1,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        backgroundColor: 'grey.100',
        position: 'relative',
        ...sx,
      }}
    >
      <Stack direction="column">
        <Typography variant="subtitle1">{title}</Typography>
        <Typography>{email}</Typography>
      </Stack>
      <IconButton
        onClick={() => onClickEdit(false)}
      >
        <EditIcon />

      </IconButton>
    </Stack>
  );
}
