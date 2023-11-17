import { Metadata } from 'next';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { issuePda } from '@/locale/en/pda';

import { Stack, Typography } from '@mui/material';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Issue a Private Data Asset - Gateway Network',
  };
}

export default async function IssuePage() {
  return (
    <>
      <TopBarContainer>
        <BackButton href={routes.dashboard.user.issuedAssets} />
      </TopBarContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 4,
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        <Stack>
          <Typography variant="body1" color="text.secondary">
            {issuePda.title}
          </Typography>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {issuePda.subtitle}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="h5">{issuePda.featured}</Typography>
    </>
  );
}
