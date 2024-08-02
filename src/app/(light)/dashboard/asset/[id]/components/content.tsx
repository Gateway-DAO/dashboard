import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import {
  CONTAINER_PT,
  CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';

import { Stack, Box, Divider, Button } from '@mui/material';

import PageContainer from './container';
import PDAMetaDataDetails from './pda-meta-data-details';
import StructuredDetail from './pda-types/structured-detail';
import { PrivateDataAsset } from '@/services/server/mock-types';

type Props = {
  pda: PrivateDataAsset;
  backHref: string;
  isOwner: boolean;
};

// left side bar
// json file
// clean code

export default function PDADetailPage({ pda, isOwner, backHref }: Props) {
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
          <Button variant="contained" sx={{ mr: 10 }}>
            Open data asset
          </Button>
        </TopBarContainer>

        <Stack
          sx={{
            pt: {
              xs: 4,
            },
            width: '100%',
            height: '100%',
          }}
        >
          <Stack direction={'column'}>{<StructuredDetail pda={pda} />}</Stack>
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
