import { Metadata } from 'next';

import { PageProps } from '@/types/next';

import TransactionDetails from './components/details';
import TransactionHeader from './components/header';
import TransactionData from './components/transaction-data';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Gateway Transactions - ${params.id}`,
    description: `From issuances to verifications, get real-time insights from individual transactions.`,
  };
}

export default function TransactionPage({
  params: { id },
}: PageProps<{ id: string }>) {
  return (
    <>
      <TransactionHeader />
      <TransactionDetails id={id} />
      <TransactionData />
    </>
  );
}
