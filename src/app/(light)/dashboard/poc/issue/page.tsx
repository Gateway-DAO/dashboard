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
    key: 'd2825602-b23f-4e8b-acf6-588dd6b53138',
    issuer: 'lagunitas',
    owner:
      wallets[0]?.data?.address ??
      emails[0]?.data?.address ??
      'tullio%40mygateway.xyz',
    dataModel: 'ba3e9255-d5f2-47eb-8829-24daf5a90ba2',
    claim: 'test',
    callback: 'https://dev.mygateway.xyz/dashboard/poc/issue',
  };

  const {
    mutateAsync: generateSession,
    data,
    isLoading,
  } = useMutation({
    mutationKey: ['generate-session', { ...params }],
    mutationFn: async () => {
      const response = await fetch(
        'https://widget-poc-one.vercel.app/api/issue/generate-session',
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
