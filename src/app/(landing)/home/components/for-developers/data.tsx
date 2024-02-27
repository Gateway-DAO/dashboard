
import ContributeData from '@/app/(landing)/components/svgs/contribute-data';
import Button from '@/app/(landing)/components/button';
import RequestData from '@/app/(landing)/components/svgs/request-data';
import styles from './for-developers.module.scss';
import { joinClasses } from '@/app/(landing)/utils/function';

const data = [
  {
    icon: ContributeData,
    title: 'Contribute Data',
    description: 'Begin contributing data and empowering users to claim their data directly from your application.',
    buttons: [
      <a className={styles.button_link} href='https://docs.mygateway.xyz/sdk/introduction' key={0} target='_blank'>
        <Button className={joinClasses(styles.button, styles['button--outlined'])} variant='outlined'>
          Integrate SDK
        </Button>
      </a>,
      <a className={styles.button_link} href='https://mygateway.xyz/dashboard/user/assets/issue' key={1} target='_blank'>
        <Button className={styles.button}  variant='text'>
          Try no-code issuance
        </Button>
      </a>
    ],
    code: `const data = {
      query: \`
      mutation createPDA($title: String!, $description: String!,
  $owner: String!, $dataModelId: String!, $claim: JSON!) {
        createPDA(
            input: {
                title: $title,
                description: $description,
                owner: {
                    type: EVM
                    value: $owner
                }
                dataModelId: $dataModelId
                claim: $claim
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
    }
    \`,
    variables: {
      title: body.title,
      description: body.description,
      owner: body.address,
      dataModelId: process.env.DATA_MODEL_ID,
      claim: body.claim,
    },
  };

  const api = await fetch(process.env.API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "<your API key>",
      Authorization: "Bearer <your Authorization key>",
    },
    body: JSON.stringify(data),
  });`
  },
  {
    icon: RequestData,
    title: 'Request Data',
    description: 'Begin issuing your first Private Data Assets to your users and unlock a world of possibilities.',
    buttons: [
      <a className={styles.button_link} href='https://docs.mygateway.xyz/sdk/introduction' key={0} target='_blank'>
        <Button className={joinClasses(styles.button, styles['button--outlined'])} variant='outlined'>
          Integrate SDK
        </Button>
      </a>
    ],
    code: `const data2 = {
      query: \`
      mutation createPDA($title: String!, $description: String!,
  $owner: String!, $dataModelId: String!, $claim: JSON!) {
        createPDA(
            input: {
                title: $title,
                description: $description,
                owner: {
                    type: EVM
                    value: $owner
                }
                dataModelId: $dataModelId
                claim: $claim
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
    }
    \`,
    variables: {
      title: body.title,
      description: body.description,
      owner: body.address,
      dataModelId: process.env.DATA_MODEL_ID,
      claim: body.claim,
    },
  };

  const api = await fetch(process.env.API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "<your API key>",
      Authorization: "Bearer <your Authorization key>",
    },
    body: JSON.stringify(data),
  });`
  }
]

export default data;
