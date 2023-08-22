import CardCell from '@/components/card-cell/card-cell';
import ExternalLink from '@/components/external-link/external-link';
import { protocol } from '@/locale/en/protocol';
import { theme } from '@/theme';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Stack, Box, Divider, Chip, useMediaQuery } from '@mui/material';

import AuthenticatedBy from './authenticated-by';
import CardUsers from './card-users';

type Props = {
  pda: any; // TODO: Add types
};

export default function PdaCardInfo({ pda }: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Stack
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
        backgroundColor: 'common.white',
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers
        issuerAuth={pda?.issuerAuth}
        recipientAuth={pda?.recipientAuth}
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
        <CardCell label={protocol.pda.received_at}>
          <Stack direction="row" gap={1}>
            <Stack
              width={24}
              height={24}
              sx={{
                backgroundColor: 'action.selected',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MailOutlineIcon sx={{ width: 16 }} />
            </Stack>
            {pda?.recipientAuth?.wallet?.address ?? pda?.recipientAuth?.email}
          </Stack>
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
        <AuthenticatedBy authenticatedBy={pda?.issuerUser} />
        <CardCell label={protocol.data_model.data_model_id}>
          <ExternalLink
            text={limitCharsCentered(pda?.id, 6)}
            sxProps={{ alignSelf: 'flex-start' }}
            textSxProps={{ fontSize: 16, fontWeight: 400 }}
            onClick={() => console.log('test')}
          />
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
        <CardCell label={protocol.pda.issuance_date}>
          {dayjs(pda?.createdAt).format('MM/DD/YYYY, h:mm A')}
        </CardCell>
        <CardCell label={protocol.pda.expiration_date}>
          {pda?.expirationDate
            ? dayjs(pda?.expirationDate).format('MM/DD/YYYY, h:mm A')
            : protocol.pda.indeterminate}
        </CardCell>
        <CardCell label={protocol.pda.status}>
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
    </Stack>
  );
}
