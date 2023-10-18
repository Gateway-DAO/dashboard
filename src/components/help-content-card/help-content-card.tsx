'use client';

import Image from 'next/image';
import Link from 'next/link';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  desc: string;
  btnLink: string;
  btnText: string;
};

export default function HelpContentCard({
  title,
  desc,
  btnLink,
  btnText,
}: Props) {
  const [open, setOpen] = useState(false);
  let hasSeenDialog: { [key: string]: boolean } | null = JSON.parse(
    localStorage.getItem('help-content-banner') || '{}'
  );


  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(title)) {
      setOpen(true);
    }
  }, []);

  const handleClick = () => {
    const updatedDialog = { ...hasSeenDialog, [title]: true };

    localStorage.setItem('help-content-banner', JSON.stringify(updatedDialog));
    setOpen(false);
  };

  return (
    open && (
      <Box sx={{ width: '100%', mb: 3 }}>
        <Stack
          spacing={2}
          direction="row"
          padding={3}
          sx={{ backgroundColor: '#69DCED26' }}
          borderRadius={1}
        >
          <Image
            src="/question.svg"
            width={112}
            height={112}
            alt="question mark image"
          />
          <Stack width="100%">
            <Typography variant="subtitle1" color="#407077" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" gutterBottom color="#407077">
              {desc}
            </Typography>
            <div style={{ marginTop: 20 }}>
              <Button
                LinkComponent={Link}
                size="small"
                variant="outlined"
                href={btnLink}
                sx={{ color: '#407077', borderColor: '#407077' }}
                target="_blank"
              >
                {btnText}
              </Button>
            </div>
          </Stack>
          <div>
            <IconButton onClick={handleClick}>
              <CloseIcon />
            </IconButton>
          </div>
        </Stack>
      </Box>
    )
  );
}
