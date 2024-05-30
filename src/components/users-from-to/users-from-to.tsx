'use client';
import { useState } from 'react';

import { TooltipUser } from '@/components/tooltip-user/tooltip-user';
import { GatewayProfile } from '@/utils/get-organization-or-user-data';
import { limitCharsCentered } from '@/utils/string';

import { Stack, Box } from '@mui/material';

import FromToIcon from '../icons/from-to';
import UserCell from './user-cell';

type Props = {
  from: GatewayProfile;
  fromLabel: string;
  to: GatewayProfile;
  toLabel: string;
  isVertical?: boolean;
};

export default function UsersFromTo({
  from,
  fromLabel,
  to,
  toLabel,
  isVertical = false,
}: Props) {
  const [tooltipIssuer, setTooltipIssuer] = useState<boolean>(false);
  const [tooltipRecipient, setTooltipRecipient] = useState<boolean>(false);

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: isVertical ? 'column' : { xs: 'column', md: 'row' },
        alignItems: isVertical ? 'baseline' : { xs: 'baseline', md: 'stretch' },
      }}
    >
      <Stack sx={{ position: 'relative' }}>
        <UserCell
          label={fromLabel}
          picture={from.image}
          name={limitCharsCentered(from.name as string, 15)}
          id={`from-${from.username}`}
          userId={from.id}
          onClick={() => setTooltipIssuer(true)}
          verified={from?.verified as boolean}
          active={tooltipIssuer}
        />
        {tooltipIssuer && (
          <TooltipUser
            userId={from.id}
            name={from.name as string}
            picture={from.image as string}
            username={from.username as string}
            issuance_date={from?.createdAt as string}
            onClose={() => setTooltipIssuer(false)}
            isOrganization={from.isOrganization as boolean}
            verified={from.verified as boolean}
          />
        )}
      </Stack>
      <Box
        sx={{
          alignSelf: isVertical ? 'flex-start' : { md: 'center' },
          pt: isVertical ? 0 : { xs: 0, md: 2.5 },
          pb: isVertical ? 0 : { xs: 0, md: 1.5 },
          px: isVertical ? 3 : { xs: 3, md: 2 },
          transform: isVertical
            ? 'rotate(90deg)'
            : { xs: 'rotate(90deg)', md: 'none' },
          flexGrow: 0,
        }}
      >
        <FromToIcon />
      </Box>
      <Stack sx={{ position: 'relative' }}>
        <UserCell
          label={toLabel}
          picture={to.image}
          name={limitCharsCentered(to.name as string, 15)}
          alignRight={isVertical ? false : true}
          userId={to.id as string}
          id={`to-${to.username}`}
          onClick={() => setTooltipRecipient(true)}
          active={tooltipRecipient}
        />
        {tooltipRecipient && (
          <TooltipUser
            userId={to.id as string}
            name={to.name as string}
            username={to.username}
            picture={to.image as string}
            issuance_date={to.createdAt as string}
            right={isVertical ? false : true}
            onClose={() => setTooltipRecipient(false)}
          />
        )}
      </Stack>
    </Stack>
  );
}
