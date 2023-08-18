'use client';
import { protocol } from '@/locale/en/protocol';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Divider, Stack } from '@mui/material';

import ProofData from './components/proof-data';
import ProofCardInfo from './components/proof-card-info';
import ProofCardTitle from './components/proof-card-title';
import Activities from '@/components/activities/activities';

export default function ProofPage() {
  // TODO: Remove MOCK
  const proof = {
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
            name: 'Mastercard',
            chain: 'Ethereum',
            avatar:
              'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          },
        },
        {
          id: 'asdfadfasdfasdf',
          title: 'Credit Card Transactions',
          issuer: {
            name: 'Visa',
            chain: 'Ethereum',
            avatar:
              'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
          },
        },
        {
          id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fasdfas',
          title: 'Credit Card Transactions',
          issuer: {
            name: 'Amex',
            chain: 'Ethereum',
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
            name: 'Mastercard',
            chain: 'Ethereum',
            avatar:
              'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          },
        },
        {
          id: 'a23q231231312312qdasdasasdfasdf',
          title: 'Credit Score',
          issuer: {
            name: 'Visa',
            chain: 'Ethereum',
            avatar:
              'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
          },
        },
        {
          id: 'a23q231231312312qdasdasasdfa3e4q3eqglkj',
          title: 'Credit Score',
          issuer: {
            name: 'Amex',
            chain: 'Ethereum',
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
        <ProofCardTitle proof={proof} />
        <ProofCardInfo proof={proof} />
        <Button
          variant="contained"
          size="large"
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
          size="large"
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
        <Activities
          activities={proof.activities}
          activitiesTextsType={{
            Issued: 'PDA issued',
            Revoked: 'PDA revoked',
            Suspended: 'PDA suspended',
            Reactivated: 'PDA reactivated',
            Updated: 'PDA updated',
          }}
        />
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ProofData dataModels={dataModels} />
      </Stack>
    </>
  );
}
