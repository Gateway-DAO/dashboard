import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  documents: [],
  generates: {
    './src/services/protocol/types.ts': {
      schema: {
        [`${process.env.GATEWAY_PROTOCOL_ENDPOINT}`]: {
          headers: {
            'x-api-key': process.env.GATEWAY_PROTOCOL_ENDPOINT as string,
          },
        },
      },
      documents: 'src/services/protocol/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        'typescript-resolvers',
      ],
      config: {
        scalars: {
          _text: 'string',
        },
        skipTypename: true,
        defaultMapper: 'Partial<{T}>',
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: true,
        },
        fetcher: 'graphql-request',
      },
    },
  },
};

export default config;
