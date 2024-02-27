
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
    code: `import { Gateway } from "@gateway-dao/sdk";

const gateway = new Gateway({
  url: "https://protocol.mygateway.xyz/graphql",
  apiKey: process.env.API_KEY || "YOUR_API_KEY", // keep these protected in env files
  token: process.env.TOKEN || "Bearer YOUR_TOKEN", // keep these protected in env files
});

let pda = {
  dataModelId: "9f27397e-27f2-4c30-b1b7-829371de4df5",
  description: "Description of the PDA",
  title: "Favorite Person on Crypto Twitter",
  claim: {
    handleName: "@gateway_xyz",
    favoritePosts: ["awesome"],
        },
  owner: {
    type: UserIdentifierType.GATEWAY_ID,
    value: "saviour1002",
        },
};

const { createPDA } = await gatewayInstance.pda.createPDA(pda);

console.log(createPDA);`
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
    code: `import { Gateway } from "@gateway-dao/sdk";

const gateway = new Gateway({
  url: "https://protocol.mygateway.xyz/graphql",
  apiKey: process.env.API_KEY || "YOUR_API_KEY", // keep these protected in env files
  token: process.env.TOKEN || "Bearer YOUR_TOKEN", // keep these protected in env files
});

let pda = {
  dataModelId: "9f27397e-27f2-4c30-b1b7-829371de4df5",
  description: "Description of the PDA",
  title: "Favorite Person on Crypto Twitter",
  claim: {
    handleName: "@gateway_xyz",
    favoritePosts: ["awesome"],
        },
  owner: {
    type: UserIdentifierType.GATEWAY_ID,
    value: "gateway",
        },
};

const { createDataRequest } = await gateway.request.createDataRequest(
    {
    dataRequestTemplateId: "60e369b3-4400-4e9b-840b-78de91274895",
    dataUse:
      "Web3 is an idea for a new iteration of the World Wide Web which incorporates concepts such as decentralization, blockchain technologies, and token-based economics.",
    owner: { type: "GATEWAY_ID", value: "gateway" },
    }
);

console.log(createDataRequest);`
  }
]

export default data;
