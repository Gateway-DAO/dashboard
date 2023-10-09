'use client';
import { useRouter } from 'next-nprogress-bar';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { pda } from '@/locale/en/pda';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';

import { Card, Divider, Stack, Typography } from '@mui/material';

import SharedWithCardSkeleton from './shared-with-card-skeleton';

type Props = {
  pdaId: string;
};

export default function SharedWithCard({ pdaId }: Props) {
  const { privateApi } = useGtwSession();
  const { organization } = useOrganization();
  const router = useRouter();
  const { data, isFetching, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queries.proofs_by_pdas_id, [pdaId]],
    queryFn: () =>
      privateApi?.proofsByPDAIds({
        pdaIds: [pdaId],
      }),
    select: (data) => data?.proofsByPDAIds,
  });

  return (
    <>
      {data && data.length > 0 && (
        <Stack
          component={Card}
          variant="outlined"
          sx={{
            mb: 2,
            ...WIDTH_CENTERED,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              p: 2,
              color: 'text.secondary',
            }}
          >
            {pda.shared_with.shared_with}
          </Typography>
          <Stack p={2} direction="row" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              {pda.shared_with.verifier}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {pda.shared_with.data_proof_id}
            </Typography>
          </Stack>
          <Stack divider={<Divider />}>
            {isFetching || isLoading ? (
              <SharedWithCardSkeleton />
            ) : (
              <>
                {data?.map((proof, index) => (
                  <Stack
                    p={2}
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    title={`Proof ID ${proof.id}`}
                    onClick={() =>
                      router.push(
                        !!organization
                          ? routes.dashboardOrgProof(
                              organization.gatewayId,
                              proof.id
                            )
                          : routes.dashboardUserProof(proof.id)
                      )
                    }
                    sx={{
                      cursor: 'pointer',
                      transition: 'opacity ease .3s',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <GTWAvatar
                        name={
                          proof.verifierOrganization?.image ??
                          proof.verifier?.profilePicture ??
                          ''
                        }
                        src={
                          proof.verifierOrganization?.image ??
                          proof.verifier?.profilePicture
                        }
                      />
                      <Typography variant="subtitle1">
                        {limitCharsCentered(
                          proof.verifierOrganization?.name ??
                            proof.verifierOrganization?.gatewayId ??
                            proof.verifier?.displayName ??
                            proof.verifier?.gatewayId ??
                            proof.verifier?.id ??
                            '',
                          20
                        )}
                      </Typography>
                    </Stack>
                    <Typography variant="body2">
                      {limitCharsCentered(proof.id, 8)}
                    </Typography>
                  </Stack>
                ))}
              </>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
