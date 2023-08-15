'use client';
// TODO: remove use client here
import ExternalLink from '@/components/external-link/external-link';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Divider, Stack } from '@mui/material';

import { protocol } from '../../../../locale/en/protocol';
import Activities from './components/activities';
import PdaCardInfo from './components/pda-card-info';
import PdaCardTitle from './components/pda-card-title';
import PdasDataModelCard from './components/pdas-data-model-card';

export default function DashboardUser() {
  // TODO: Remove MOCK
  const pda = {
    id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
    title: 'Chase',
    issuance_date: '2018-04-04T16:00:00.000Z',
    status: 'valid',
    activities: [
      {
        type: 'Issued',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
      {
        type: 'Revoked',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
    ],
  };
  const dataModels = [
    {
      id: 'a23q231231312312qdasdasdfas',
      title: 'Credit Card Transactions',
      credentials: [
        {
          id: '7Cae5130c16e6c8b686440b900d93fe12asdfasdfasd91977e70b812d170024f1cffd0e3fe375',
          title: 'Credit Card Transactions',
          issuer: {
            name: 'mastercard',
            avatar:
              'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          },
        },
        {
          id: 'asdfadfasdfasdf',
          title: 'Credit Card Transactions',
          issuer: {
            name: 'visa',
            avatar:
              'https://logosmarcas.net/wp-content/uploads/2020/05/Visa-Logo.png',
          },
        },
        {
          id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fasdfas',
          title: 'Credit Card Transactions',
          issuer: {
            name: 'amex',
            avatar:
              'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
          },
        },
      ],
    },
    {
      id: 'a23q23123131231da2312qdasdas',
      title: 'Credit Score',
      credentials: [
        {
          id: 'a23q231231312312qdasdas',
          title: 'Credit Score',
          issuer: {
            name: 'mastercard',
            avatar:
              'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          },
        },
        {
          id: 'a23q231231312312qdasdasasdfasdf',
          title: 'Credit Score',
          issuer: {
            name: 'visa',
            avatar:
              'https://logosmarcas.net/wp-content/uploads/2020/05/Visa-Logo.png',
          },
        },
        {
          id: 'a23q231231312312qdasdasasdfa3e4q3eqglkj',
          title: 'Credit Score',
          issuer: {
            name: 'amex',
            avatar:
              'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
          },
        },
      ],
    },
  ];

  return (
    <>
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <PdaCardTitle pda={pda} />
        <PdaCardInfo pda={pda} />
        <Button
          variant="outlined"
          sx={{
            mb: 2,
            width: '100%',
            fontWeight: 700,
            fontSize: 13,
          }}
          onClick={() => console.log('test')} // TODO: Add action
        >
          {protocol.pda.share_a_copy}
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{
            mb: 2,
            width: '100%',
            fontWeight: 700,
            fontSize: 13,
          }}
          onClick={() => console.log('test')} // TODO: Add action
          startIcon={<CancelIcon height={20} width={20} color="error" />}
        >
          {protocol.pda.revoke_access}
        </Button>
        <ExternalLink
          text={protocol.pda.storage_id}
          sxProps={{ alignSelf: 'flex-end' }}
          handleClick={() => console.log('test')} // TODO: Add a dynamic url
        />
        <Activities activities={pda.activities} />
      </Stack>
      <Divider sx={{ width: '100%', mb: 5, mt: 2 }} />
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <PdasDataModelCard dataModels={dataModels} />
      </Stack>
    </>
  );
}
