import Loading from '@/components/loadings/loading';
import { protocol } from '@/locale/en/protocol';
import { limitCharsCentered } from '@/utils/string';

import { Stack, Box } from '@mui/material';

import CardUserCell from './card-user-cell';

type Props = {
  issuerAuth: any; // TODO: Add types
  recipientAuth: any; // TODO: Add types
};

export default function CardUsers({ issuerAuth, recipientAuth }: Props) {
  const isLoading = false;

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'baseline', md: 'stretch' },
      }}
    >
      {issuerAuth?.isLoading ? (
        <Loading margin={1} />
      ) : (
        <CardUserCell
          label={protocol.pda.issuer}
          picture={null}
          fallback={issuerAuth?.data?.logo_url}
          name={limitCharsCentered(issuerAuth?.gatewayId, 20)}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="36"
          viewBox="0 0 19 36"
          fill="none"
        >
          <path
            d="M1 1L18 18L1 35"
            stroke="black"
            stroke-opacity="0.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Box>
      {isLoading ? (
        <Loading margin={1} />
      ) : (
        <CardUserCell
          label={protocol.pda.owner}
          picture={recipientAuth?.data?.picture}
          name={limitCharsCentered(recipientAuth?.gatewayId, 20)}
          alignRight={true}
          id="pda-textlink-recipientid"
        />
      )}
    </Stack>
  );
}
