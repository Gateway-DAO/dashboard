import { Suspense } from 'react';

import ErrorBoundary from '@/components/error-boundary/error-boundary';

import { Stack, Typography } from '@mui/material';

import PDAsList from './components/pdas-list';

export default function DataAssetsPage() {
  // const pdas = [
  //   {
  //     id: '7Cae5130c16e6c8b686440b900d93fe12asdfasdfasd91977e70b812d170024f1cffd0e3fe375',
  //     title: 'Credit Card Transactions',
  //     issuer: {
  //       name: 'Mastercard',
  //       chain: 'Ethereum',
  //       avatar:
  //         'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
  //     },
  //   },
  //   {
  //     id: 'asdfadfasdfasdf',
  //     title: 'Credit Card Transactions',
  //     issuer: {
  //       name: 'Visa',
  //       chain: 'Ethereum',
  //       avatar:
  //         'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
  //     },
  //   },
  //   {
  //     id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fasdfas',
  //     title: 'Credit Card Transactions',
  //     issuer: {
  //       name: 'Amex',
  //       chain: 'Ethereum',
  //       avatar:
  //         'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
  //     },
  //   },
  //   {
  //     id: '7Cae5130c16e6c8b686440b900d93fe12asdfasdfasd91977e70b812d170024f1cffd0e3fe375',
  //     title: 'Credit Card Transactions',
  //     issuer: {
  //       name: 'Mastercard',
  //       chain: 'Ethereum',
  //       avatar:
  //         'https://play-lh.googleusercontent.com/1KHh3KnzltZQR2hDUoEkQx12bn34tUjOstlnt2YGdWsa9-zluNpFxHiK_ETsbWyJcbky=w480-h960-rw',
  //     },
  //   },
  //   {
  //     id: 'asdfadfasdfasdf',
  //     title: 'Credit Card Transactions',
  //     issuer: {
  //       name: 'Visa',
  //       chain: 'Ethereum',
  //       avatar:
  //         'https://static.vecteezy.com/system/resources/previews/009/469/638/original/visa-logo-company-providing-services-of-payment-operations-free-vector.jpg',
  //     },
  //   },
  //   {
  //     id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fasdfas',
  //     title: 'Credit Card Transactions',
  //     issuer: {
  //       name: 'Amex',
  //       chain: 'Ethereum',
  //       avatar:
  //         'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
  //     },
  //   },
  // ];
  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <ErrorBoundary fallback={<Typography>Suspense error boundary</Typography>}>
          <Suspense fallback={<Typography>Loading...</Typography>}>
            <PDAsList />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </>
  );
}
