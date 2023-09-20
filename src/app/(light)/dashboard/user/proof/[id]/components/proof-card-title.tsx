'use client';
import { useState } from 'react';

import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { TooltipUser } from '@/components/tooltip-user/tooltip-user';
import { proof as proofLocale } from '@/locale/en/proof';
import { ProofQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, alpha } from '@mui/material';

type Props = {
  proof: PartialDeep<ProofQuery['proof']> | undefined;
};

export default function ProofCardTitle({ proof }: Props) {
  const [tooltip, setTooltip] = useState<boolean>(false);

  return (
    <Stack
      sx={{
        borderRadius: 1,
        mb: 3,
        p: 2,
        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.4),
        flexDirection: { xs: 'column', md: 'row' },
      }}
      alignItems="flex-start"
      justifyContent="space-between"
      gap={2}
    >
      <Stack gap={2.5}>
        <Typography variant="caption" color="text.secondary">
          {proofLocale.share.data_shared_with}
        </Typography>
        <Stack sx={{ position: 'relative' }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.7, transition: 'opacity .3s ease' },
            }}
            id="tooltip-link-proof"
            onClick={() => setTooltip(true)}
          >
            <GTWAvatar
              src={''}
              size={56}
              name={proof?.verifier?.gatewayId as string}
            />
            <Typography variant="h3" id="proof-title">
              {proof?.verifier?.displayName ??
                proof?.verifier?.gatewayId ??
                proof?.verifier?.id}
            </Typography>
          </Stack>
          {tooltip && (
            <TooltipUser
              name={
                proof?.verifier?.displayName ??
                proof?.verifier?.gatewayId ??
                (proof?.verifier?.id as string)
              }
              username={
                proof?.verifier?.gatewayId ?? (proof?.verifier?.id as string)
              }
              issuance_date={dayjs(proof?.createdAt).format(
                'MM/DD/YYYY, h:mm A'
              )}
              onClose={() => setTooltip(false)}
            />
          )}
        </Stack>
      </Stack>
      {/* <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {`ID ${limitCharsCentered(proof?.id as string, 8)}`}
      </Typography> */}
      <CopyTextButton text={proof?.id as string} limit={12} size={12} />
      {/* <ExternalLink text={`ID ${limitCharsCentered(proof?.id, 8)}`} href="#" /> */}
    </Stack>
  );
}
