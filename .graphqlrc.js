require('dotenv').config();
module.exports = {
  projects: {
    protocol: {
      schema: {
        [`${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`]: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      },
      documents: 'src/services/protocol/**/*.gql',
    },
    protocolV3: {
      schema: {
        [`${process.env.NEXT_PUBLIC_API_V3_ENDPOINT}/graphql`]: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      },
      documents: 'src/services/protocol-v3/**/*.gql',
    },
  },
};
