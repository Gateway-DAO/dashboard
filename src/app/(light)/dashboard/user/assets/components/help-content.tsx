'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { helperContent } from '@/locale/en/pda';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Stack, Typography, IconButton } from '@mui/material';

export default function HelpContent() {
  const [showHelperBar, setHelperBar] = useState(true);
  return (
    showHelperBar && (
      <Box sx={{ width: '100%', mb: 3 }}>
        <Stack
          spacing={2}
          direction={'row'}
          padding={3}
          sx={{ backgroundColor: '#69DCED26' }}
          borderRadius={1}
        >
          <Image
            src={'/question.svg'}
            width={112}
            height={112}
            alt="question mark image"
          />
          <Stack width={'100%'}>
            <Typography variant="subtitle1" color={'#407077'} gutterBottom>
              {helperContent.title}
            </Typography>
            <Typography variant="body1" gutterBottom color={'#407077'}>
              {helperContent.desc}
            </Typography>
            <div style={{ marginTop: 20 }}>
              <Button
                LinkComponent={Link}
                size="small"
                variant="outlined"
                href={helperContent.btnLink}
                sx={{ color: '#407077', borderColor: '#407077' }}
                target="_blank"
              >
                {helperContent.btnText}
              </Button>
            </div>
          </Stack>
          <div>
            <IconButton onClick={() => setHelperBar(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </Stack>
      </Box>
    )
  );
}
