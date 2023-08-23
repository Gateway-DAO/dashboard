'use client';
import { useState } from 'react';

import { protocol } from '@/locale/en/protocol';
import { PdaQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';

import { Stack, Box } from '@mui/material';

import CardUserCell from './card-user-cell';
import { TooltipUser } from './tooltip-user';

type Props = {
  pda: PdaQuery['credential'];
};

export default function CardUsers({ pda }: Props) {
  const [tooltipIssuer, setTooltipIssuer] = useState<boolean>(false);
  const [tooltipRecipient, setTooltipRecipient] = useState<boolean>(false);

  const issuerName =
    pda?.issuerOrganization?.gatewayId ??
    pda?.issuerUser?.gatewayId ??
    pda?.issuerUser?.primaryWallet?.address ??
    '';

  const issuerPicture = pda?.issuerAuth?.data?.picture ?? '';

  const recipientName =
    pda?.recipientUser?.gatewayId ??
    pda?.recipientUser?.primaryWallet?.address ??
    '';

  const recipientPicture = pda?.recipientAuth?.data?.picture ?? '';

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'baseline', md: 'stretch' },
      }}
    >
      <Stack sx={{ position: 'relative' }}>
        <CardUserCell
          label={protocol.pda.issuer}
          picture={issuerPicture}
          name={limitCharsCentered(issuerName, 20)}
          id={`pda-issuer-${issuerName}`}
          onClick={() => setTooltipIssuer(true)}
          active={tooltipIssuer}
        />
        {tooltipIssuer && (
          <TooltipUser
            name={issuerName}
            username={issuerName}
            issuance_date={pda?.createdAt} // TODO: created at user
            onClose={() => setTooltipIssuer(false)}
          />
        )}
      </Stack>
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
      <Stack sx={{ position: 'relative' }}>
        <CardUserCell
          label={protocol.pda.owner}
          picture={recipientPicture}
          name={limitCharsCentered(recipientName, 20)}
          alignRight={true}
          id={`pda-recipient-${recipientName}`}
          onClick={() => setTooltipRecipient(true)}
          active={tooltipRecipient}
        />
        {tooltipRecipient && (
          <TooltipUser
            name={recipientName}
            username={recipientName}
            issuance_date={pda?.createdAt} // TODO: created at user
            right={true}
            onClose={() => setTooltipRecipient(false)}
          />
        )}
      </Stack>
    </Stack>
  );
}
