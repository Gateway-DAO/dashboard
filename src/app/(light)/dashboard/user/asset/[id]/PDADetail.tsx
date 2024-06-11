'use client';
import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Stack, Box } from '@mui/material';

import PDAItem from '../old/[id]/components/pda-item';
import PDAMetaDataDetails from '../old/[id]/components/pda-meta-data-details';

type Props = {
  pda: any;
  org: any;
};

export default function PDADetail({ pda, org }: Props) {
  return (
    <Stack>
      <TopBarContainer>
        <BackButton
          href={
            !!org
              ? routes.dashboard.org.issuedAssets(org?.gatewayId)
              : routes.dashboard.user.myAssets
          }
          sx={{ mt: -5, mb: 5, ml: 2 }}
        />
      </TopBarContainer>

      <Stack
        component={'aside'}
        sx={(theme) => ({
          boxSizing: 'border-box',
          pt: 10,
          pb: 2,
          px: CONTAINER_PX,
          [theme.breakpoints.down('lg')]: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          },
          [theme.breakpoints.up('lg')]: {
            borderRight: '1px solid',
            borderColor: 'divider',
            maxWidth: 650,
            width: '100%',
            px: 2.5,
            position: 'fixed',
            height: '100%',
            boxSizing: 'border-box',
          },
        })}
      >
        <PDAItem pda={pda} />
      </Stack>
      <Box
        width="100%"
        sx={{
          px: CONTAINER_PX,
          ml: {
            xs: 0,
            lg: '600px',
          },
          overflow: 'hidden',
          mt: -3,
        }}
      >
        <PDAMetaDataDetails pda={pda} />
      </Box>
    </Stack>
  );
}
