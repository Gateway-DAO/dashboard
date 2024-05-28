'use client';

import { useGtwSession } from '@/context/gtw-session-provider';
import { ApolloSandbox } from '@apollo/sandbox/react';

import { Stack } from '@mui/material';

type Props = {
  id: string;
};

const initialQuery = (id: string) => {
  return `mutation {
    createDataRequest(input: {
      dataRequestTemplateId: "${id}",
      owner: {
        type: GATEWAY_ID,
        value: "GATEWAY_ID"
      },
      dataUse: "Lorem Ipsum"
    }) {
      arweaveUrl,
      id,
      status
      dataUse
      verifierOrganization {
        id
        gatewayId
      }
    }
  }`;
};

export default function PlaygroundWrapper({ id }: Props) {
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
          document: initialQuery(id),
          includeCookies: false,
        }}
        initialEndpoint={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`}
        endpointIsEditable={false}
      />
    </Stack>
  );
}
