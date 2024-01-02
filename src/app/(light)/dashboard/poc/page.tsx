'use client';

import { useState } from 'react';

import DefaultError from '@/components/default-error/default-error';
import { useGtwSession } from '@/context/gtw-session-provider';

import { Button, Card, Typography } from '@mui/material';

export default function POCHome() {
  const { session } = useGtwSession();
  const [pathname, _setPathname] = useState(
    'https://widget-poc-one.vercel.app/issue'
  );
  const [access, _setAccess] = useState('5263b875-a216-473b-b4da-d674313c6642');
  const [gtwid, _setGtwid] = useState('visajames');
  const [owner, _setOwner] = useState('kbooz');
  const [datamodel, _setDatamodel] = useState('12345-12345-12345-12345');
  const [claim, _setClaim] = useState('{value:1,name:"junior"}');
  const [callback, _setCallback] = useState(
    'https://mygateway.xyz/dashboard/poc'
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
