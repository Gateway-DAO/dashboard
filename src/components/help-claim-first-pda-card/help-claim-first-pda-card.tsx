'use client';

import { FC, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Card,
  SvgIconProps,
} from '@mui/material';

type Props = {
  title: string;
  onClickCard: () => void;
  btnText: string;
  icon: FC<SvgIconProps>;
};

export default function HelpClaimFirstPdaCard({
  title,
  onClickCard,
  btnText,
  icon: Icon,
}: Props) {
  const [open, setOpen] = useState(false);
  let hasSeenDialog: { [key: string]: boolean } | null;

  useEffect(() => {
    hasSeenDialog = JSON.parse(localStorage.getItem('help-cta-card') || '{}');
  }, []);

  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(title)) {
      setOpen(true);
    }
  }, []);

  const handleClick = () => {
    const updatedDialog = { ...hasSeenDialog, [title]: true };
    localStorage.setItem('help-cta-card', JSON.stringify(updatedDialog));
    setOpen(false);
  };

  return (
    open && (
      <Stack
        component={Card}
        position={'relative'}
        onClick={onClickCard}
        sx={{
          mb: 3,
          p: 2,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          width: '100%',
          maxWidth: { xs: '100%', md: 342 },
          cursor: 'pointer',
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <Icon sx={{ width: 40, height: 40, mb: 3, flexGrow: 1 }} />
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box>
          <Button variant="contained">{btnText}</Button>
        </Box>
      </Stack>
    )
  );
}
