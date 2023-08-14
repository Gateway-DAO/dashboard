require('dotenv').config();
module.exports = {
  projects: {
    protocol: {
      schema: {
        [`${process.env.GATEWAY_PROTOCOL_ENDPOINT}`]: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_PROTOCOL_API_KEY,
          },
        },
      },
      documents: 'src/services/protocol/**/*.gql'
    }
  }
}
