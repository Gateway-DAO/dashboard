import Loading from '@/components/loadings/loading';
import { protocol } from '@/locale/en/protocol';
import { theme } from '@/theme';
import { limitCharsCentered } from '@/utils/string';

import { Stack, Box, useMediaQuery } from '@mui/material';

import CardUserCell from './card-user-cell';

type Props = {
  issuer: any; // TODO: Add types
  organization?: any; // TODO: Add types
  recipient: any; // TODO: Add types
};

export default function CardUsers({
  issuer: issuerPda,
  organization: issuerOrganization,
  recipient: recipientCredential,
}: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const issuerName = issuerPda?.gatewayId;
  const recipientName = recipientCredential?.gatewayId;
  const isLoading = false;

  const showPicture = () => {
    if (issuerOrganization) return issuerOrganization?.data?.logo;
    return;
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'baseline', md: 'stretch' },
      }}
    >
      {issuerPda?.isLoading ? (
        <Loading margin={1} />
      ) : (
        <CardUserCell
          label={protocol.pda.issuer_id}
          picture={showPicture()}
          fallback={issuerOrganization?.data?.logo_url}
          name={limitCharsCentered(issuerName, 20)}
          id="pda-textlink-issuerid"
        />
      )}
      <Box
        sx={{
          alignSelf: { md: 'center' },
          py: { xs: 0, md: 2 },
          px: { xs: 3, md: 2 },
          transform: { xs: 'rotate(90deg)', md: 'none' },
        }}
      >
        <svg width="18" height="36" fill="none" viewBox="0 0 18 36">
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity=".7"
            d="m.5 1 17 17-17 17"
          />
        </svg>
      </Box>
      {isLoading ? (
        <Loading margin={1} />
      ) : (
        <CardUserCell
          label={protocol.pda.recipient_id}
          picture={recipientCredential?.data?.picture}
          name={limitCharsCentered(recipientName, 20)}
          alignRight={!isMobile}
          id="pda-textlink-recipientid"
        />
      )}
    </Stack>
  );
}
