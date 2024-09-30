import { Metadata } from 'next';

import { PageProps } from '@/types/next';

import TransactionDetails from './components/details';
import TransactionHeader from './components/header';

export const metadata: Metadata = {
  title: `Transaction Details`,
  description: `From issuances to verifications, get real-time insights from individual transactions.`,
};

export default function TransactionPage({
  params: { id },
}: PageProps<{ id: string }>) {
  return (
    <>
      <TransactionHeader />
      <TransactionDetails id={id} />
    </>
  );
}
