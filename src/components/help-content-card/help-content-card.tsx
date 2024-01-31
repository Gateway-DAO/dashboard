'use client';

import Image from 'next/image';
import Link from 'next/link';

import useLocalStorageInstructionGuide from '@/hooks/use-instruction-guide';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Stack, Typography, IconButton } from '@mui/material';

import styles from './styles.module.css';

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
  const { visible, onSaveStorage } = useLocalStorageInstructionGuide({
    storageKey: title.toLowerCase(),
  });

  return (
    visible && (
      <Box sx={{ width: '100%', mb: 3 }}>
        <Stack
          position={'relative'}
          gap={2}
          direction="row"
          padding={3}
          sx={{ backgroundColor: '#69DCED26' }}
          borderRadius={1}
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Image
            src="/question.svg"
            width={112}
            height={112}
            alt="question mark image"
            className={styles.image}
          />
          <Stack width="100%" sx={{ alignSelf: 'flex-end' }}>
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
          <span style={{ position: 'absolute', top: 20, right: 20 }}>
            <IconButton onClick={onSaveStorage} sx={{ cursor: 'pointer' }}>
              <CloseIcon />
            </IconButton>
          </span>
        </Stack>
      </Box>
    )
  );
}
