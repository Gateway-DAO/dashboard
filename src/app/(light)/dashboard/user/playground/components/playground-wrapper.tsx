'use client';

import { ApolloSandbox } from '@apollo/sandbox/react';

import { Stack } from '@mui/material';

export default function PlaygroundWrapper() {
  return (
    <Stack
      sx={{
        height: '100%',
        '& iframe': {
          minHeight: '600px',
        },
      }}
    >
      <ApolloSandbox initialEndpoint="https://develop.protocol.mygateway.xyz/v1/graphql" />
    </Stack>
  );
}
