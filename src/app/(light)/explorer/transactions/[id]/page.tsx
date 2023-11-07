import { PageProps } from '@/types/next';

import TransactionDetails from './components/details';
import TransactionHeader from './components/header';

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
