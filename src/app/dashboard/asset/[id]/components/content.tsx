import BackButton from '@/components/buttons/back-button';
import { LoadingButton } from '@/components/buttons/loading-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import { PrivateDataAsset } from '@/services/server/mock-types';
import { CONTAINER_PX, WIDTH_CENTERED } from '@/theme/config/style-tokens';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { Stack, Box, Divider } from '@mui/material';

import AccessDetails from './access/access-details';
import PageContainer from './container';
import StructuredDetail from './pda-types/structured-detail';

type Props = {
  pda: PrivateDataAsset;
  backHref: string;
};

export default function PDADetailPage({ pda, backHref }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  // this code will change once will have api
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['decrypting-data-asset', pda],
    mutationFn: async (): Promise<void> => {
      if (pda.structured) {
        const mockData = JSON.stringify({ message: 'This is mock data.' });
        const blob = new Blob([mockData], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${pda.fileName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        setTimeout(() => {
          window.open(
            'https://docs.google.com/viewerng/viewer?url=https://www.learningcontainer.com/download/sample-pdf-file-for-testing/?ind%3D0%26filename%3Dsample-pdf-file.pdf%26wpdmdl%3D1566%26refresh%3D66ac72d0cc8441722577616%26open%3D1',
            '_blank',
            'noopener,noreferrer'
          );
        }, 1000);
      }
    },
    onError: () => {
      enqueueSnackbar('Something went wrong!');
    },
  });

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
          <LoadingButton
            variant="contained"
            onClick={() => {
              mutateAsync();
            }}
            sx={{ mr: 7 }}
            isLoading={isPending}
          >
            Open data asset
          </LoadingButton>
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
        <AccessDetails pda={pda} />
      </Box>
    </PageContainer>
  );
}
