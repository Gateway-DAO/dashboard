import Image from 'next/image';

import { WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Box, Stack } from '@mui/material';

export default function FileDetail() {
  return (
    <Stack
      sx={{
        maxWidth: {
          xs: WIDTH_CENTERED.maxWidth,
          lg: 'unset',
        },
        mx: {
          xs: 'auto',
          lg: 'unset',
        },
        width: '100%',
      }}
    >
      <Box
        sx={{
          aspectRatio: '570/550',
          position: 'relative',
          maxWidth: 570,
          height: '100%',
        }}
      >
        <Image
          style={{
            objectFit: 'contain',
            aspectRatio: '16/9',
          }}
          fill
          className="feature-img"
          src={'/images/static-file.png'}
          alt={'static-file-image'}
        />
      </Box>
    </Stack>
  );
}
