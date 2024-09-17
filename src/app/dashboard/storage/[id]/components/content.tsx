import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import { PublicDataAsset } from '@/services/api/models';
import { CONTAINER_PX, WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Stack, Box, Divider } from '@mui/material';

import AccessesSidebar from './access/accesses-sidebar';
import PageContainer from './container';
import DownloadPDA from './download-pda';
import StructuredDetail from './pda-types/structured-detail';

type Props = {
  pda: PublicDataAsset;
  backHref: string;
};

export default function PDADetailPage({ pda, backHref }: Props) {
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
          <DownloadPDA
            id={pda.id!}
            type={pda.type!}
            name={pda.name!}
          ></DownloadPDA>
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
          <Stack direction="column">{<StructuredDetail pda={pda} />}</Stack>
        </Stack>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          flex: 1,
          maxWidth: {
            xs: WIDTH_CENTERED.maxWidth,
            lg: 450,
          },
          mx: {
            xs: 'auto',
            lg: 0,
          },
          width: {
            xs: '100%',
            lg: 'auto',
          },
          pt: { lg: 3, xs: 2 },
        }}
      >
        <AccessesSidebar pda={pda} />
      </Box>
    </PageContainer>
  );
}
