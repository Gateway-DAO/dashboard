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
        px: 2,
        pt: 2,
        pb: 3,
        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.4),
        position: 'relative',
      }}
      gap={2.5}
    >
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
            src={proof?.verifier?.profilePicture ?? ''}
            size={56}
            name={proof?.verifier?.gatewayId as string}
          />
          <Typography
            variant="h3"
            id="proof-title"
            sx={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
            }}
          >
            {proof?.verifier?.displayName ??
              proof?.verifier?.gatewayId ??
              limitCharsCentered(proof?.verifier?.id as string, 12)}
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
            issuance_date={dayjs(proof?.createdAt).format('MM/DD/YYYY, h:mm A')}
            onClose={() => setTooltip(false)}
          />
        )}
      </Stack>
      <Stack sx={{ position: 'absolute', top: 10, right: 12 }}>
        {/* <ExternalLink text={`ID ${limitCharsCentered(proof?.id, 8)}`} href="#" /> */}
        <CopyTextButton text={proof?.id as string} limit={12} size={14} />
      </Stack>
    </Stack>
  );
}
