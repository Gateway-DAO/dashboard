'use client';

import { useRouter } from 'next-nprogress-bar';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import DefaultError from '@/components/default-error/default-error';
import { useGtwSession } from '@/context/gtw-session-provider';
import { useMutation } from '@tanstack/react-query';

import { Card, Typography } from '@mui/material';

export default function POCIssueHome() {
  const { session } = useGtwSession();
  const router = useRouter();
  const auths = session.user.authentications;
  const wallets = auths?.filter((item) => item.type === 'WALLET') ?? [];
  const emails = auths?.filter((item) => item.type === 'EMAIL') ?? [];
  const params = {
    key: '5263b875-a216-473b-b4da-d674313c6642',
    issuer: 'visajames',
    owner:
      wallets[0]?.data?.address ??
      emails[0]?.data?.address ??
      'tullio%40mygateway.xyz',
    dataModel: 'f3c2009a-4388-4613-ad4a-43f611c78c31',
    claim: {
      topArtists: ['Bruno Mars'],
    },
    callbackUrl: 'https://dev.mygateway.xyz/dashboard/poc/issue',
  };

  const { mutateAsync: generateSession, isLoading } = useMutation({
    mutationKey: ['generate-session', { ...params }],
    mutationFn: async () => {
      const response = await fetch(
        'https://widget-poc-gateway-dao.vercel.app/api/issue/generate-session',
        {
          method: 'POST',
          body: JSON.stringify({
            ...params,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error('Failed to generate session');
      }
      return data;
    },
    onSuccess: (data) => {
      console.log('success', data);
      router.push(data?.session?.url);
      // window.open(
      //   data?.session?.url,
      //   'Issue a Personal Data Asset',
      //   'height=800,width=460,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes'
      // );
    },
    onError: (error: any) => {
      console.log('error', error);
    },
  });

  if (!process.env.NEXT_PUBLIC_POC_WIDGET_KEY) {
    return <DefaultError />;
  }

  return (
    <Card sx={{ p: 2, m: 3, alignSelf: 'center', width: 400 }}>
      <Typography variant="caption">ENJOY ALL BENEFITS</Typography>
      <Typography variant="h6" mb={1}>
        Hi {session.user.displayName ?? session.user.gatewayId}!
      </Typography>
      <Typography mb={2}>
        Share and Unlock Experiences with our partners today.
      </Typography>
      <LoadingButton
        variant="contained"
        isLoading={isLoading}
        onClick={() => generateSession()}
      >
        Claim Now
      </LoadingButton>
    </Card>
  );
}
