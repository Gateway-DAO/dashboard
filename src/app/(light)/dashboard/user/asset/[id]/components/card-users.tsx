'use client';
import { useState } from 'react';

import { TooltipUser } from '@/components/tooltip-user/tooltip-user';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { PartialDeep } from 'type-fest';

import { Stack, Box } from '@mui/material';

import CardUserCell from './card-user-cell';

type Props = {
  pda: PartialDeep<PdaQuery['PDAbyId'] | null>;
};

export default function CardUsers({ pda }: Props) {
  const [tooltipIssuer, setTooltipIssuer] = useState<boolean>(false);
  const [tooltipRecipient, setTooltipRecipient] = useState<boolean>(false);

  const issuerGatewayId =
    pda?.dataAsset?.organization?.gatewayId ??
    pda?.dataAsset?.issuer?.gatewayId ??
    '';

  const issuerDisplayName =
    pda?.dataAsset?.organization?.name ?? pda?.dataAsset?.issuer?.displayName;

  const issuerName =
    issuerDisplayName ?? issuerGatewayId ?? pda?.dataAsset?.issuer?.id;

  const issuerPicture =
    pda?.dataAsset?.organization?.image ??
    pda?.dataAsset?.issuer?.profilePicture ??
    '';

  const recipientName =
    pda?.dataAsset?.owner?.displayName ??
    pda?.dataAsset?.owner?.gatewayId ??
    pda?.dataAsset?.owner?.id ??
    '';

  const recipientPicture = pda?.dataAsset?.owner?.profilePicture ?? '';

  console.log('teste', pda?.dataAsset);

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
          id={`pda-issuer-${issuerGatewayId}`}
          onClick={() => setTooltipIssuer(true)}
          verified={false} // TODO: Vefiry if the issuer is a verified user (backloged)
          active={tooltipIssuer}
        />
        {tooltipIssuer && (
          <TooltipUser
            name={issuerName}
            picture={issuerPicture}
            username={issuerGatewayId}
            issuance_date={pda?.dataAsset?.issuer?.createdAt}
            onClose={() => setTooltipIssuer(false)}
            isOrganization={!!pda?.dataAsset?.issuer?.gatewayId}
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
            issuance_date={pda?.dataAsset?.owner?.createdAt}
            right={true}
            onClose={() => setTooltipRecipient(false)}
          />
        )}
      </Stack>
    </Stack>
  );
}
