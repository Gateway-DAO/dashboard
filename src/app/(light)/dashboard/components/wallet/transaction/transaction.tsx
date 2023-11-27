import { My_TransactionsQuery } from '@/services/protocol/types';

import TransactionCardInfo from './transaction-card-info';
import TransactionCardTitle from './transaction-card-title';

type Props = {
  transaction: My_TransactionsQuery['myFinancialTransactions'][0];
};

export function Transaction({ transaction }: Props) {
  const { id, total, type, action, createdAt, fee, value } = transaction;

  return (
    <>
      <TransactionCardTitle
        amount={total}
        type={type}
        action={action}
        value={value}
        fee={fee}
      />
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
