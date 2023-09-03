'use client';
import { useState } from 'react';

import { TooltipUser } from '@/components/tooltip-user/tooltip-user';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PrivateDataAsset } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { PartialDeep } from 'type-fest';

import { Stack, Box } from '@mui/material';

import CardUserCell from './card-user-cell';

type Props = {
  pda: PartialDeep<PrivateDataAsset>;
};

export default function CardUsers({ pda }: Props) {
  const [tooltipIssuer, setTooltipIssuer] = useState<boolean>(false);
  const [tooltipRecipient, setTooltipRecipient] = useState<boolean>(false);

  const issuerName =
    pda?.dataAsset?.issuerOrganization?.gatewayId ??
    pda?.dataAsset?.issuerUser?.gatewayId ??
    '';

  const issuerPicture = pda?.dataAsset?.issuerAuth?.data?.picture ?? '';

  const recipientName = pda?.dataAsset?.recipientUser?.gatewayId ?? '';

  const recipientPicture = pda?.dataAsset?.recipientAuth?.data?.picture ?? '';

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
          label={pdaLocale.issuer}
          picture={issuerPicture}
          name={limitCharsCentered(issuerName, 15)}
          id={`pda-issuer-${issuerName}`}
          onClick={() => setTooltipIssuer(true)}
          verified={false} // TODO: Vefiry if the issuer is a verified user (backloged)
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
          flexGrow: 0,
          width: 20,
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
          label={pdaLocale.owner}
          picture={recipientPicture}
          name={limitCharsCentered(recipientName, 15)}
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
