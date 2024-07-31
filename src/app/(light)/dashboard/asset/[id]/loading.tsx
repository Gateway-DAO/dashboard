import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import { CONTAINER_PX, WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Box, Divider, Stack } from '@mui/material';

import PageContainer from './components/container';
import PDASkeleton from './components/pda-skeleton';

export default function LoadingPDAPage() {
  return (
    <>
      <PageContainer>
        <Box flex="1" pr={CONTAINER_PX} pb={2}>
          <TopBarContainer>
            <BackButton />
          </TopBarContainer>

          <Stack
            sx={{
              pt: 10,
              width: '100%',
              height: '100%',
            }}
          >
            <Stack direction={'column'} sx={WIDTH_CENTERED}>
              <PDASkeleton />
            </Stack>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            mt: 3,
            flex: 1,
            maxWidth: 400,
          }}
        ></Box>
      </PageContainer>
    </>
  );
}
