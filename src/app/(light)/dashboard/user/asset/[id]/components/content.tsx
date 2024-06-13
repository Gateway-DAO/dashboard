import Image from 'next/image';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import routes from '@/constants/routes';
import {
  PrivateDataAsset,
  Organization,
  DataModelQuery,
} from '@/services/protocol-v3/types';
import {
  CONTAINER_PT,
  CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';

import { Stack, Box, Divider } from '@mui/material';

import PDAMetaDataDetails from '../../old/[id]/components/pda-meta-data-details';
import { PageContainer } from './container';
import StructuredDetail from './pda-types/structured-detail';

type Props = {
  pda: PrivateDataAsset;
  org: Organization;
  isOwner: boolean;
};

export default function PDADetailPage({ pda, org, isOwner }: Props) {
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
          <Stack direction={'column'}>
            {pda.structured ? (
              <StructuredDetail pda={pda} />
            ) : (
              <Stack direction="column" gap={8} alignItems="start">
                <Image
                  style={{
                    objectFit: 'contain',
                    aspectRatio: '16/9',
                  }}
                  width={570}
                  height={550}
                  className="feature-img"
                  src={'/images/static-file.png'}
                  alt={'static-file-image'}
                />
              </Stack>
            )}
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
