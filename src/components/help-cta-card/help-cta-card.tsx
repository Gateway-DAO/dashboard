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
  desc: string;
  btnLink: string;
  btnText: string;
  icon: FC<SvgIconProps>;
};

export default function HelpCtaCard({
  title,
  desc,
  btnLink,
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
        sx={{
          mb: 3,
          p: 2,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          width: '100%',
          maxWidth: { xs: '100%', md: 342 },
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <Icon sx={{ width: 40, height: 40, mb: 1 }} />
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
          {desc}
        </Typography>
        <Box>
          <Button variant="contained" href={btnLink}>
            {btnText}
          </Button>
        </Box>
      </Stack>
    )
  );
}
