'use client';
import { useRouter } from 'next-nprogress-bar';

import ProofCardInfo from '@/app/(light)/dashboard/user/proof/[id]/components/proof-card-info';
import ProofCardTitle from '@/app/(light)/dashboard/user/proof/[id]/components/proof-card-title';
import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { pda } from '@/locale/en/pda';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { CheckOutlined } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import ShareCopyFormSuccessSkeleton from './share-copy-form-successfully-skeleton';

type Props = {
  id: string;
};

export default function ShareCopyFormSuccessfully({ id }: Props) {
  const { privateApi, session } = useGtwSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queries.proof, id],
    queryFn: () =>
      privateApi?.proof({
        id,
      }),
    select: (data) => data?.proof,
  });

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(common.general.success_copy_message);
    } catch (err) {
      enqueueSnackbar(errorMessages.UNEXPECTED_ERROR, { variant: 'error' });
    }
  };

  const isOwner = data?.owner.id === session.user.id;

  return (
    <>
      {isFetching || isLoading ? (
        <ShareCopyFormSuccessSkeleton />
      ) : (
        <Stack>
          <Box sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
            <Avatar
              sx={{ backgroundColor: 'success.main', color: 'action.active' }}
            >
              <CheckOutlined />
            </Avatar>
          </Box>
          <Typography
            id="proof-created-title"
            component="h3"
            fontSize={34}
            sx={{ mb: 6 }}
          >
            {pda.share.successfully_title}
          </Typography>
          <ProofCardTitle isOwner={isOwner} proof={data} />
          <ProofCardInfo proof={data} />
          <Button
            variant="contained"
            id="share-pda-button-check-now"
            sx={{ mb: 1.5 }}
            onClick={() => router.push(routes.dashboard.user.sharedData(id))}
          >
            {common.actions.check_now}
          </Button>
          <Button
            variant="outlined"
            id="share-pda-button-copy-url"
            sx={{ mb: 3 }}
            onClick={() =>
              copy(
                `${window.location.origin}${routes.dashboard.user.sharedData(
                  id
                )}`
              )
            }
          >
            <LinkIcon sx={{ mr: 1 }} />
            {common.actions.copy_url}
          </Button>
        </Stack>
      )}
    </>
  );
}
