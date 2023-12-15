import DataOutlinedIcon from '@/components/icons/data-outlined';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import {
  explorerDataModels,
  explorerDataModelDetail,
} from '@/locale/en/datamodel';
import { pdas } from '@/locale/en/pda';

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import ExplorerBreadcrumb from '../../../components/breadcrumb/breadcrumb';
import ExplorerHeader from '../../../components/header/header';

type Props = {
  id: string;
  title: string;
  tags: string[];
};

export default function DataModelDetailHeader({ id, title, tags }: Props) {
  return (
    <>
      <ExplorerHeader sx={{ pb: 5 }}>
        <Container sx={{ maxWidth: 896, marginLeft: 'unset' }}>
          <ExplorerBreadcrumb
            paths={[
              {
                route: routes.explorer.dataModels,
                label: explorerDataModels.title,
              },
              {
                label: title,
              },
            ]}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
              {title}
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<DataOutlinedIcon />}
              href={routes.dashboard.user.issuePda(id)}
            >
              {pdas.issue_a_pda}
            </Button>
          </Box>
          {tags && (
            <Stack direction="row" gap={1}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </Stack>
          )}
        </Container>
      </ExplorerHeader>
      <Container>
        <GTWTabs>
          <GTWTab
            label={common.general.overview}
            href={routes.explorer.dataModel(id)}
          />
          <GTWTab
            label={explorerDataModelDetail.tabs.issuers}
            href={routes.explorer.dataModelIssuers(id)}
          />
        </GTWTabs>
      </Container>
      <Divider
        sx={{
          mb: 5,
        }}
      />
    </>
  );
}
