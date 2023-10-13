'use client';

import { useGtwSession } from '@/context/gtw-session-provider';
import { ApolloSandbox } from '@apollo/sandbox/react';

import { Stack } from '@mui/material';

const dataModelIdByEnv = {
  development: 'f4014d53-b30f-4490-9812-cea379a1b398',
  staging: 'f4014d53-b30f-4490-9812-cea379a1b398',
  testnet: 'f4014d53-b30f-4490-9812-cea379a1b398',
};

const currentDataModel = dataModelIdByEnv[
  process.env.NEXT_PUBLIC_API_ENDPOINT as 'development' | 'staging' | 'testnet'
] as string;

const initialQuery = `mutation createPDA {
  createPDA(
      input: {
          title: "Hello Gateway"
          description: "This is the first PDA I have issued with Gateway!"
          owner: {
              type: GATEWAY_ID
              value: "sanket"
          }
          dataModelId: ${currentDataModel}
          image: "https://cdn.mygateway.xyz/logo.png"
          expirationDate: null
          claim: {gatewayUse: "To make data move with you"}
      }
  ) {
      id
      arweaveUrl
      dataAsset {
          owner {
              id
              gatewayId
          }
          issuer {
              id
              gatewayId
          }
      }
  }
}`;

export default function PlaygroundWrapper() {
  const { session } = useGtwSession();

  return (
    <Stack
      sx={{
        height: '100%',
        '& iframe': {
          minHeight: '600px',
        },
      }}
    >
      <ApolloSandbox
        initialState={{
          sharedHeaders: {
            'x-api-key': process.env.NEXT_PUBLIC_API_PLAYGROUND_KEY!,
            Authorization: `Bearer ${session.token}`,
          },
          document: initialQuery,
          includeCookies: false,
        }}
        initialEndpoint={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`}
        endpointIsEditable={false}
      />
    </Stack>
  );
}
