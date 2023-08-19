import useTranslation from 'next-translate/useTranslation';

import { theme } from '@/theme';

import { Stack, Button, Box, useMediaQuery } from '@mui/material';

import { ModalContentProps } from './ModalContentTypes';

export default function QRCodeOrImage({
  handleClose,
  children,
  imageUrl,
  enableDownloadImage,
  swipeableDrawer = false,
}: ModalContentProps) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Box sx={{ width: { xs: 250, md: 396 }, margin: 'auto' }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 3,
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {children}
      </Box>
      <Stack gap={1}>
        {enableDownloadImage && imageUrl && (
          <Button variant="contained" href={imageUrl} target="_blank" download>
            {t('common:actions.download')}
          </Button>
        )}
        {((swipeableDrawer && !isMobile) || !swipeableDrawer) && (
          <Button variant="outlined" onClick={() => handleClose()}>
            {t('common:actions.close')}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
