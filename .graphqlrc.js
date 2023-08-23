require('dotenv').config();
module.exports = {
  projects: {
    protocol: {
      schema: {
        [`${process.env.NEXT_PUBLIC_API_ENDPOINT}`]: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      },
      documents: 'src/services/protocol/**/*.gql'
    }
  }
}
