import { useState } from 'react';

import CopyButton from '@/components/copy-button/copy-button';
import routes from '@/constants/routes';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { CodeBlock, dracula } from 'react-code-blocks';

import {
  Box,
  Button,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function TabsStructure({
  isLoading,
  id,
  data,
}: {
  isLoading: boolean;
  id: string;
  data: any;
}) {
  const [currentTab, setTab] = useState(0);

  const mutation = `mutation {
        createDataRequest(input: {
            dataRequestTemplateId: "${id}",
            owner: {
                type: GATEWAY_ID,
                value: "ADD THE DATA OWNER"
            },
            dataUse: "ADD WHAT’S THE REASON TO REQUEST THE DATA"
        }) {
            arweaveUrl,
            id,
            status
            dataUse
        }
    }`;
  const codeCreateRequestProps = {
    text: mutation,
    theme: dracula,
    language: 'graphql',
  };

  const detailsTemplateProps = {
    theme: dracula,
    language: 'graphql',
    text: `data: {
      dataRequestTemplate: {
        id: "${data?.id}",
        name: "${data?.name}",
        schema: ${JSON.stringify(data?.schema)},
        organization: ${data?.organization},
        createdAt: "${data?.createdAt}"
      }
    }`,
  };
  return (
    <Stack mt={3}>
      <Stack
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      >
        <Tabs
          onChange={(event, newValue: number) => setTab(newValue)}
          value={currentTab}
        >
          <Tab label="Create data request" />
          <Tab label="Details" />
        </Tabs>
      </Stack>
      <CustomTabPanel value={currentTab} index={0}>
        <Typography variant="body1">
          Copy the mutation to create a data request using this template
        </Typography>
        <Box sx={{ gap: 2, display: 'flex', mt: 4, mb: 4 }}>
          <CopyButton
            variant="contained"
            customButtonText="Copy mutation"
            text={mutation}
          />
          <Button variant="outlined" href={routes.dashboardUserPlayground}>
            Go to playground
          </Button>
        </Box>
        {isLoading ? (
          <Skeleton width={100} height={300} />
        ) : (
          <CodeBlock {...codeCreateRequestProps} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <CodeBlock {...detailsTemplateProps} />
      </CustomTabPanel>
    </Stack>
  );
}
