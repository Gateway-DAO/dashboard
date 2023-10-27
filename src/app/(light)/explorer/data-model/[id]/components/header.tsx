import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { DataModel } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Chip, Container, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import ExplorerBreadcrumb from '../../../components/breadcrumb/breadcrumb';
import ExplorerHeader from '../../../components/header/header';
import {
  explorerDataModels,
  explorerDataModelDetail,
} from '@/locale/en/datamodel';

type Props = {
  id: string;
  title: string;
  tags: string[];
};

export default function DataModelDetailHeader({ id, title, tags }: Props) {
  return (
    <>
      <ExplorerHeader sx={{ pb: 5 }}>
        <Container>
          <ExplorerBreadcrumb
            paths={[
              {
                route: routes.explorerDataModels,
                label: explorerDataModels.title,
              },
              {
                label: title,
              },
            ]}
          />
          <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
            {title}
          </Typography>
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
            href={routes.explorerDataModel(id)}
          />
          <GTWTab
            label={explorerDataModelDetail.tabs.issuers}
            href={routes.explorerDataModelIssuers(id)}
          />
          <GTWTab
            label={explorerDataModelDetail.tabs.tied_request_templates}
            href={routes.explorerDataModelRequestTemplates(id)}
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
