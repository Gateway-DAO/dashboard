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
    dataModel: '6f61ccb0-85e0-47b3-879d-f197c04c4f9e',
    claim:
      '%7B%22tier%22%3A%22Gold%22%2C%22points%22%3A1000%2C%22type%22%3A%22Adventure+Expert%22%7D',
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
