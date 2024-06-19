import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { PrivateDataAsset, Organization } from '@/services/protocol-v3/types';
import {
  CONTAINER_PT,
  CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';

import { Stack, Box, Divider } from '@mui/material';

import PageContainer from './container';
import PDAMetaDataDetails from './pda-meta-data-details';
import FileDetail from './pda-types/file-detail';
import StructuredDetail from './pda-types/structured-detail';

type Props = {
  pda: PrivateDataAsset;
  org: Organization;
  backHref: string;
  isOwner: boolean;
};

export default function PDADetailPage({ pda, org, isOwner, backHref }: Props) {
  return (
    <PageContainer>
      <Box
        flex="1"
        pr={{
          lg: CONTAINER_PX.lg,
        }}
        pb={2}
      >
        <TopBarContainer>
          <BackButton href={backHref} />
        </TopBarContainer>

        <Stack
          sx={{
            pt: {
              xs: 4,
              lg: 10,
            },
            width: '100%',
            height: '100%',
          }}
        >
          <Stack direction={'column'}>
            {pda.structured ? <StructuredDetail pda={pda} /> : <FileDetail />}
          </Stack>
        </Stack>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          flex: 1,
          maxWidth: {
            xs: WIDTH_CENTERED.maxWidth,
            lg: 400,
          },
          mx: {
            xs: 'auto',
            lg: 0,
          },
          width: {
            xs: '100%',
            lg: 'auto',
          },
          pt: CONTAINER_PT,
        }}
      >
        <PDAMetaDataDetails pda={pda} isOwner={isOwner} />
      </Box>
    </PageContainer>
  );
}
