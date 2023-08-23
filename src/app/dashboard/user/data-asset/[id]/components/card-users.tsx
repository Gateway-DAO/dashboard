import { protocol } from '@/locale/en/protocol';
import { limitCharsCentered } from '@/utils/string';

import { Stack, Box } from '@mui/material';

import CardUserCell from './card-user-cell';

type Props = {
  issuerName: string;
  issuerPicture: string;
  recipientName: string;
  recipientPicture: string;
};

export default function CardUsers({
  issuerName,
  issuerPicture,
  recipientName,
  recipientPicture,
}: Props) {
  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'baseline', md: 'stretch' },
      }}
    >
      <CardUserCell
        label={protocol.pda.issuer}
        picture={issuerPicture}
        name={limitCharsCentered(issuerName, 20)}
        id={`pda-issuer-${issuerName}`}
      />
      <Box
        sx={{
          alignSelf: { md: 'center' },
          pt: { xs: 0, md: 2.5 },
          pb: { xs: 0, md: 1.5 },
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
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
      <CardUserCell
        label={protocol.pda.owner}
        picture={recipientPicture}
        name={limitCharsCentered(recipientName, 20)}
        alignRight={true}
        id={`pda-recipient-${recipientName}`}
      />
    </Stack>
  );
}
