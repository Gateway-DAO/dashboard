import { useState } from 'react';

import CopyButton from '@/components/copy-button/copy-button';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { DataModelByIdQuery } from '@/services/protocol/types';
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
  data: DataModelByIdQuery['dataModel'];
}) {
  const [currentTab, setTab] = useState(0);
  const { organization } = useOrganization();

  const claimObj = !!data
    ? Object.keys(data?.schema.properties)
        .map((propertyName) => {
          const isRequired = data?.schema.required.includes(propertyName);
          const propertyType = data?.schema.properties[propertyName].type;
          const fieldRequired = isRequired ? 'FIELD REQUIRED' : '';

          return ` ${propertyName}: "${fieldRequired}" # ${propertyType}`;
        })
        .join('\n\t\t')
    : null;

  const mutation = `mutation createPDA {
      createPDA(
        input: {
          title: "${data?.title}",
          description: "${data?.description}",
          owner: {
            type: GATEWAY_ID,
            value: "ADD OWNER ID HERE"
          }
          dataModelId: "${id}",
          expirationDate: null,
          ${
            !!organization
              ? `organization: {
              type: GATEWAY_ID,
              value: "${organization?.gatewayId}"
            }`
              : ``
          }
          claim: {
            ${claimObj}
          }
        }) {
          id,
          arweaveUrl,
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
  const codeCreateRequestProps = {
    text: mutation,
    theme: dracula,
    language: 'graphql',
  };

  const detailsDataModelProps = {
    theme: dracula,
    language: 'graphql',
    text: `data: {
      dataModel: {
        id: "${id}",
        title: "${data?.title}",
        description: "${data?.description}",
        schema: ${JSON.stringify(data?.schema)},
        ${
          data?.organization
            ? `organization: {
                id: "${data?.organization?.id}",
                gatewayId: "${data?.organization?.gatewayId}",
                name: "${data?.organization?.name}"
              }`
            : `organization: null,`
        }
        createdBy: {
          id: "${data?.createdBy?.id}",
          gatewayId: "${data?.createdBy?.gatewayId}",
          displayName: ${
            data?.createdBy?.displayName
              ? `"${data?.createdBy?.displayName}"`
              : null
          },
        }
        consumptionPrice: ${data?.consumptionPrice}
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
          <Tab label="Issue PDA" />
          <Tab label="Details" />
        </Tabs>
      </Stack>
      <CustomTabPanel value={currentTab} index={0}>
        <Typography variant="body1">
          Copy the mutation to issue a PDA using this data model.
        </Typography>
        <Box sx={{ gap: 2, display: 'flex', mt: 4, mb: 4 }}>
          <CopyButton
            variant="contained"
            customButtonText="Copy mutation"
            text={mutation}
          />
          <Button
            variant="outlined"
            href={
              !!organization
                ? routes.dashboardOrgPlayground(organization.gatewayId)
                : routes.dashboardUserPlayground
            }
          >
            Go to playground
          </Button>
        </Box>
        {isLoading ? (
          <Skeleton width="100%" height={300} />
        ) : (
          <CodeBlock {...codeCreateRequestProps} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <CodeBlock {...detailsDataModelProps} />
      </CustomTabPanel>
    </Stack>
  );
}
