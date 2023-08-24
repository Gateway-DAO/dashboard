import useTranslation from 'next-translate/useTranslation';

import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
  credentialId: string;
};

export default function SendPdaFormSuccessfully({ credentialId }: Props) {
  const { t } = useTranslation('protocol');

  return (
    <Stack>
      <Box sx={{ position: 'absolute', top: { xs: '24px', md: '48px' } }}>
        Test
      </Box>
      <Typography variant="h5" sx={{ mb: 3, maxWidth: 270 }}>
        {t('data-model.successfully-title')}
      </Typography>
      <Stack
        sx={{
          border: '1px solid rgba(229, 229, 229, 0.12)',
          borderRadius: 2,
          pt: 2,
          px: 2,
        }}
      >
        <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1.5,
              overflow: 'hidden',
            }}
          >
            <img src="test" alt="test" width="100%" />
          </Box>
          <Stack justifyContent="center">
            <Typography fontSize={14} sx={{ color: 'primary.main' }}>
              ID aksdjfaksdjjfasjf;l
            </Typography>
            <Typography variant="h6">asdfasfasdf</Typography>
          </Stack>
        </Stack>
        {/* <CredentialCardInfo credential={credential?.data} elevation={20} /> */}
        <Button
          variant="contained"
          id="issuanceflow-button-checkcredential"
          sx={{ mb: 3 }}
        >
          asfasdf
        </Button>
      </Stack>
    </Stack>
  );
}
