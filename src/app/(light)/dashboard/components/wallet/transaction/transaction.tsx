import { My_TransactionsQuery } from '@/services/protocol/types';

import TransactionCardInfo from './transaction-card-info';
import TransactionCardTitle from './transaction-card-title';

type Props = {
  transaction: My_TransactionsQuery['myFinancialTransactions'][0];
};

export function Transaction({ transaction }: Props) {
  const { id, value, type, action, createdAt } = transaction;

  return (
    <>
      <TransactionCardTitle amount={value} type={type} />
      <TransactionCardInfo
        title={action}
        id={id}
        date={createdAt}
        type={type}
        objectId={id}
      />
    </>
  );
}
