'use client';

import { useState } from 'react';

import DefaultError from '@/components/default-error/default-error';
import { useGtwSession } from '@/context/gtw-session-provider';

import { Button, Card, Typography } from '@mui/material';

export default function POCIssueHome() {
  const { session } = useGtwSession();
  const auths = session.user.authentications;
  const wallets = auths?.filter((item) => item.type === 'WALLET') ?? [];
  const emails = auths?.filter((item) => item.type === 'EMAIL') ?? [];

  const [pathname, _setPathname] = useState(
    'https://widget-poc-one.vercel.app/issue'
  );
  const [owner, _setOwner] = useState(
    wallets[0]?.data?.address ??
      emails[0]?.data?.address ??
      'tullio%40mygateway.xyz'
  );
  const [access, _setAccess] = useState('d2825602-b23f-4e8b-acf6-588dd6b53138');
  const [gtwid, _setGtwid] = useState('thenorthface');
  const [datamodel, _setDatamodel] = useState(
    '6f61ccb0-85e0-47b3-879d-f197c04c4f9e'
  );
  const [claim, _setClaim] = useState(
    '%7B%22tier%22%3A%22Gold%22%2C%22points%22%3A1000%2C%22type%22%3A%22Adventure+Expert%22%7D'
  );
  const [callback, _setCallback] = useState(
    'https://dev.mygateway.xyz/dashboard/poc/issue'
  );

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
      <Button
        variant="contained"
        href={`${pathname}?access=${access}&gtwid=${gtwid}&owner=${owner}&datamodel=${datamodel}&claim=${claim}&callback=${callback}`}
      >
        Claim Now
      </Button>
    </Card>
  );
}
