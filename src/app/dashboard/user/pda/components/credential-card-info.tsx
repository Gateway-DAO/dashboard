import useTranslation from 'next-translate/useTranslation';

import CardCell from '@/components/card-cell/card-cell';
import { protocol } from '@/locale/en/protocol';
import { theme } from '@/theme';
import dayjs from 'dayjs';

import { Stack, Paper, Box, Divider, Chip, useMediaQuery } from '@mui/material';

import AuthenticatedBy from './authenticated-by';
import CardUsers from './card-users';

type Props = {
  pda: any; // TODO: Add types
  elevation?: number;
};

export default function CredentialCardInfo({ pda, elevation = 2 }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Paper
      elevation={elevation}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers
        issuer={pda?.issuerUser}
        organization={pda?.issuerOrganization}
        recipient={pda?.recipientUser}
      />
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
        divider={
          <Box>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
          </Box>
        }
      >
        <AuthenticatedBy authenticatedBy={pda?.issuerUser} />
        <CardCell label={t('pda.status')}>
          {pda?.status === 'valid' && (
            <Chip
              label={protocol.pda.valid}
              size="small"
              variant="filled"
              color="success"
            />
          )}
          {pda?.status === 'suspended' && (
            <Chip
              label={protocol.pda.suspended}
              size="small"
              variant="filled"
              color="warning"
            />
          )}
          {pda?.status === 'revoked' && (
            <Chip
              label={protocol.pda.revoked}
              size="small"
              variant="filled"
              color="warning"
            />
          )}
          {pda?.status === 'invalid' && (
            <Chip
              label={protocol.pda.invalid}
              size="small"
              variant="filled"
              color="error"
            />
          )}
        </CardCell>
      </Stack>
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
        divider={
          <Box>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
          </Box>
        }
      >
        <CardCell label={t('credential.issuance-date')}>
          {dayjs(pda?.createdAt).format('MM/DD/YYYY, h:mm A')}
        </CardCell>
        <CardCell label={t('credential.expiration-date')}>
          {pda?.expirationDate
            ? dayjs(pda?.expirationDate).format('MM/DD/YYYY, h:mm A')
            : protocol.pda.indeterminate}
        </CardCell>
      </Stack>
    </Paper>
  );
}
