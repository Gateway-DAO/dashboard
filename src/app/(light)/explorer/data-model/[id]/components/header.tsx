import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { DataModel } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Chip, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import ExplorerBreadcrumb from '../../../components/breadcrumb/breadcrumb';
import ExplorerHeader from '../../../components/header/header';
import {
  explorerDataModels,
  explorerDataModelDetail,
} from '@/locale/en/datamodel';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function DataModelDetailHeader({ dataModel }: Props) {
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
                label: dataModel.title!,
              },
            ]}
          />
          <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
            {dataModel.title}
          </Typography>
          {dataModel.tags && (
            <Stack direction="row" gap={1}>
              {dataModel.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </Stack>
          )}
        </Container>
      </ExplorerHeader>
      <Container
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: 5,
        }}
      >
        <GTWTabs>
          <GTWTab
            label={common.general.overview}
            href={routes.explorerDataModel(dataModel.id)}
          />
          <GTWTab
            label={explorerDataModelDetail.tabs.issuers}
            href={routes.explorerDataModelIssuers(dataModel.id)}
          />
          <GTWTab
            label={explorerDataModelDetail.tabs.tied_request_templates}
            href={routes.explorerDataModelRequestTemplates(dataModel.id)}
          />
        </GTWTabs>
      </Container>
    </>
  );
}
