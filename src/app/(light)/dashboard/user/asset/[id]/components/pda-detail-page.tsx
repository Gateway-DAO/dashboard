'use client';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import {
  PrivateDataAsset,
  Organization,
  DataModelQuery,
} from '@/services/protocol-v3/types';
import {
  CONTAINER_PB,
  CONTAINER_PT,
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PT,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Stack, Box, Divider } from '@mui/material';

import PDAMetaDataDetails from '../../old/[id]/components/pda-meta-data-details';
import PDADetail from './pda-detail';

type Props = {
  pda: PrivateDataAsset;
  org: Organization;
  dataModel: DataModelQuery['dataModel'];
};

export default function PDADetailPage({ pda, org, dataModel }: Props) {
  return (
    <Stack
      direction="row"
      mr={NEGATIVE_CONTAINER_PX}
      alignItems="stretch"
      minHeight="100%"
      sx={(theme) => ({
        mt: NEGATIVE_CONTAINER_PT,
        height: {
          xs: `calc(100% + ${theme.spacing(
            CONTAINER_PT.xs + CONTAINER_PB.xs
          )})`,
          lg: `calc(100% + ${theme.spacing(
            CONTAINER_PT.lg + CONTAINER_PB.lg
          )})`,
        },
      })}
    >
      <Box flex="1" pr={CONTAINER_PX} pb={2}>
        <TopBarContainer>
          <BackButton
            href={
              !!org
                ? routes.dashboard.org.issuedAssets(org?.did)
                : routes.dashboard.user.myAssets
            }
          />
        </TopBarContainer>

        <Stack
          sx={{
            pt: 10,
            width: '100%',
            height: '100%',
          }}
        >
          <PDADetail pda={pda} dataModel={dataModel} />
        </Stack>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          mt: 3,
          flex: 1,
          maxWidth: 400,
        }}
      >
        <PDAMetaDataDetails pda={pda} />
      </Box>
    </Stack>
  );
}
