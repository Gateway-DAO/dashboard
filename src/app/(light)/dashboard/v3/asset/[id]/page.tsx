'use client';

import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { getPDA } from '@/services/server-functions/pda';
import { getSessionOrg } from '@/utils/currentOrg';
import PDAItem from '../../../user/asset/[id]/components/pda-item';
import { Stack, Box } from '@mui/material';
import PDADetails from '../../../user/asset/[id]/components/pda-details';
import { CONTAINER_PX } from '@/theme/config/style-tokens';

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const pda = await getPDA(params.id);
//   return {
//     title: `${pda?.dataAsset?.title} | Data Asset - Gateway Network`,
//     description: pda?.dataAsset?.description,
//   };
// }

const findPda = (id: string) => {
  const pdas = [
    {
      id: 11955822999552,
      activity: [
        {
          title: 'You shared data with statefarm',
          date: '2024-05-30T03:21:38.000Z',
        },
        { title: 'statefarm requested data', date: '2024-05-29T03:21:38.000Z' },
      ],
      fileName: null,
      issuanceDate: '2024-05-31T03:21:38.000Z',
      lastUpdated: '2024-05-31T05:20:21.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'joao',
        did: 'did:joao',
      },
      owner: {
        username: 'sid',
        did: 'did:mygateway:sid',
      },
      dataAsset: {
        claimArray: [
          {
            points: 0,
          },
          {
            transactions: 0,
          },
          {
            tier: 'hello',
          },
          {
            tier: 'hello',
          },
          {
            tier: 'hello',
          },
          {
            tier: 'hello',
          },
          {
            tier: 'hello',
          },
        ],
        title: 'test',
      },
      sharing: [
        { username: 'statefarm', did: 'statefarm' },
        { username: 'harrison', did: 'harrison' },
      ],
      tags: ['pda', 'test-1'],
    },
    {
      id: 5856991978496,
      activity: [
        {
          title: 'You shared data with statefarm',
          date: '2024-05-30T03:21:38.000Z',
        },
        { title: 'statefarm requested data', date: '2024-05-29T03:21:38.000Z' },
      ],
      fileName: 'test.pdf',
      issuanceDate: '2024-05-30T20:44:20.000Z',
      lastUpdated: '2024-05-30T20:44:20.000Z',
      mimeType: '.pdf',
      size: 100,
      structured: false,
      issuer: {
        username: 'joao',
        did: 'did:joao',
      },
      owner: {
        username: 'sid',
        did: 'did:mygateway:sid',
      },
      sharing: [
        { username: 'statefarm', did: 'statefarm' },
        { username: 'harrison', did: 'harrison' },
      ],
      dataAsset: null,
      tags: ['pda', 'test-1'],
    },
  ];

  return pdas.find((pda) => pda.id === parseInt(id));
};

export default async function PDAPage({
  params,
}: {
  params: { id: string; username: string };
}) {
  const pda = await findPda(params.id);
  // const org = await getSessionOrg(params.username);
  const org: any = undefined;

  return (
    <Stack>
      <TopBarContainer>
        <BackButton
          href={
            !!org
              ? routes.dashboard.org.issuedAssets(org?.gatewayId)
              : routes.dashboard.user.receivedAssets
          }
          sx={{ mt: -5, mb: 5, ml: 2 }}
        />
      </TopBarContainer>

      <Stack
        component={'aside'}
        sx={(theme) => ({
          boxSizing: 'border-box',
          pt: 10,
          pb: 2,
          px: CONTAINER_PX,
          [theme.breakpoints.down('lg')]: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          },
          [theme.breakpoints.up('lg')]: {
            borderRight: '1px solid',
            borderColor: 'divider',
            maxWidth: 650,
            width: '100%',
            px: 2.5,
            position: 'fixed',
            height: '100%',
            boxSizing: 'border-box',
          },
        })}
      >
        <PDAItem pda={pda} />
      </Stack>
      <Box
        width="100%"
        sx={{
          px: CONTAINER_PX,

          ml: {
            xs: 0,
            lg: '600px',
          },
          overflow: 'hidden',
          mt: -3,
        }}
      >
        <PDADetails pda={pda} />
      </Box>
    </Stack>
  );
}
