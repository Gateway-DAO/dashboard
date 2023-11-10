import { PageProps } from '@/types/next';

import TransactionDetails from './components/details';
import TransactionHeader from './components/header';
import TransactionData from './components/transaction-data';

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
