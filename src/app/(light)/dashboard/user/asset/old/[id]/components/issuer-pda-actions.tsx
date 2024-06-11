import { useMemo } from 'react';

import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { PdaQuery, PdaStatus } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import { RevokePDA } from './revoke-pda/revoke-pda';
import { SuspendOrMakeValidPDA } from './suspend-or-make-valid-pda/suspend-or-make-valid-pda';

type Props = {
  pda: PartialDeep<PdaQuery['PDA'] | null>;
};

export default function IssuerPDAActions({ pda }: Props) {
  const { session } = useGtwSession();
  const { organization } = useOrganization();

  const displayingAsOrg = !!organization;
  const verifierIsOrg = !!pda?.dataAsset?.organization?.gatewayId;

  const isValid = useMemo(() => pda?.status === PdaStatus.Valid, [pda]);
  const isSuspended = useMemo(() => pda?.status === PdaStatus.Suspended, [pda]);
  const isIssuer = useMemo(
    () =>
      displayingAsOrg
        ? session?.user?.accesses?.find(
            (access) =>
              pda?.dataAsset?.organization?.gatewayId ===
              access?.organization?.did
          )
        : session.user.username === pda?.dataAsset?.issuer?.gatewayId ||
          session?.user?.accesses?.find(
            (access) =>
              pda?.dataAsset?.organization?.gatewayId ===
              access?.organization?.did
          ),
    [pda, session, displayingAsOrg]
  );

  if (
    (!displayingAsOrg && verifierIsOrg) ||
    (displayingAsOrg && !verifierIsOrg)
  ) {
    return null;
  }

  return (
    <Stack data-custom-id="issuer-pda-actions" direction="row" gap={1}>
      <SuspendOrMakeValidPDA
        pdaId={pda?.id}
        pdaStatus={pda?.status}
        isIssuer={isIssuer}
        isSuspended={isSuspended}
        isValid={isValid}
      />
      <RevokePDA pdaId={pda?.id} pdaStatus={pda?.status} isIssuer={isIssuer} />
    </Stack>
  );
}
