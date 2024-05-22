import type { CodegenConfig } from '@graphql-codegen/cli';

const defaultOptions: CodegenConfig['generates'][0] = {
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
};

const config: CodegenConfig = {
  overwrite: true,
  documents: [],
  generates: {
    './src/services/protocol/types.ts': {
      schema: {
        [`${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`]: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
          },
        },
      },
      documents: 'src/services/protocol/**/*.gql',
      ...defaultOptions,
    },
    './src/services/protocol-v3/types.ts': {
      schema: {
        [`${process.env.NEXT_PUBLIC_API_V3_ENDPOINT}/graphql`]: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
          },
        },
      },
      documents: 'src/services/protocol-v3/**/*.gql',
      ...defaultOptions,
    },
  },
};

export default config;
