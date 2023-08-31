import Activities from '@/components/activities/activities';
import BackButton from '@/components/back-button';
import routes from '@/constants/routes';
import { pda } from '@/locale/en/pda';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Divider, Stack } from '@mui/material';

import ModalPDADetail from './components/modal-pda-detail/modal-pda-detail';
import ProofCardInfo from './components/proof-card-info';
import ProofCardTitle from './components/proof-card-title';
import ProofData from './components/proof-data';
import ProofRevokeButton from './components/proof-revoke-button';
import ProofShareButton from './components/proof-share-button';

export default function ProofPage() {
  // TODO: Remove MOCK
  const proof = {
    id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
    title: 'Chase',
    issuance_date: '2018-04-04T16:00:00.000Z',
    status: 'Valid',
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
          id: '0c0ff388-23e7-47ec-9175-1bcd7880877c',
          name: 'Credit Card Transactions',
          issuerName: 'Mastercard',
          issuerImage:
            'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          status: 'revoked',
        },
        {
          id: '1640ed0a-5054-4d32-9bef-531ffc8b44fd',
          name: 'Credit Card Transactions',
          issuerName: 'Visa',
          issuerImage:
            'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
          status: 'valid',
        },
        {
          id: '0cc1591b-e3e7-477a-bd2c-c8e3d91e57ee',
          name: 'Credit Card Transactions',
          issuerName: 'Amex',
          issuerImage:
            'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
          status: 'valid',
        },
      ],
    },
    {
      id: 'a23q23123131231da2312qdasdas',
      title: 'Credit Score',
      credentials: [
        {
          id: '06b74feb-e647-4196-a6f9-8e231e7b8c73',
          name: 'Credit Score',
          issuerName: 'Mastercard',
          issuerImage:
            'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
          status: 'valid',
        },
        {
          id: '16015e45-a91d-49f1-a361-a0af9d3a6f8e',
          name: 'Credit Score',
          issuerName: 'Visa',
          issuerImage:
            'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
          status: 'revoked',
        },
        {
          id: '1ce079c6-9c39-4ac9-9b37-3eaefbe2b159',
          name: 'Credit Score',
          issuerName: 'Amex',
          issuerImage:
            'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
          status: 'valid',
        },
      ],
    },
  ];

  return (
    <>
      <BackButton href={routes.dashboardUserProofs} />
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ProofCardTitle proof={proof} />
        <ProofCardInfo proof={proof} />
        <ProofShareButton proof={proof} />
        <ProofRevokeButton proof={proof} />
        <Activities
          activities={proof.activities}
          activitiesTextsType={{
            Issued: pda.activities.issued,
            Revoked: pda.activities.revoked,
            Suspended: pda.activities.suspended,
            Reactivated: pda.activities.reactivated,
            Updated: pda.activities.updated,
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
      <ModalPDADetail />
    </>
  );
}
