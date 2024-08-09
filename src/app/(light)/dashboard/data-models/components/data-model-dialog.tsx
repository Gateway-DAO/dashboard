import CopyBox from '@/components/copy-box/copy-box';
import CopyButton from '@/components/copy-button/copy-button';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Stack, Typography } from '@mui/material';

type Props = {
  dataModelId: string;
  open: boolean;
  onClose: () => void;
};

const mutation = `mutation createPDA { createPDA(
  input: {
   title: "Hello Gateway"
   description: "This is the first PDA I have issued with Gateway!"
   owner: {
    type: GATEWAY_ID
    value: "ADD OWNER ID HERE"
    }
    dataModelId: "f4014d53-b30f-4490-9812-cea379a1b398"
    image: "https://cdn.mygateway.xyz/logo.png"
    expirationDate: null
    claim: {gatewayUse: "ADD THE CLAIM INFO"}
}
){
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

export function DataModelDialog({ open, onClose, dataModelId }: Props) {
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      <Stack gap={3}>
        <Typography variant="h4" gutterBottom>
          Hello Gateway
        </Typography>
        <Typography variant="body1">
          Welcome to Gateway, the new way to your data. This is an introductory
          data model used to provide developers a chance to help understand how
          the protocol and network works.
        </Typography>
        <CopyBox title="Data model ID" value={dataModelId} />
        <Stack>
          <Typography variant="subtitle1">Create Structured Data</Typography>
          <Typography variant="body1">
            Copy the request body to create a Structured Data using this data
            model.
          </Typography>
        </Stack>
        <CopyButton text={mutation} variant="contained" />

        <SyntaxHighlighter
          language="graphql"
          style={nightOwl}
          customStyle={{ borderRadius: 12 }}
        >
          {mutation}
        </SyntaxHighlighter>
      </Stack>
    </ModalRight>
  );
}
