import TransactionCardInfo from './transaction-card-info';
import TransactionCardTitle from './transaction-card-title';
import { TransactionDetail } from './transaction-modal';

type Props = {
  transaction: TransactionDetail;
};

export function Transaction({ transaction }: Props) {
  const { id, value, type, action, createdAt } = transaction;

  return (
    <>
      <TransactionCardTitle amount={value} type={type} />
      <TransactionCardInfo
        title={action}
        id={id}
        action={action}
        date={createdAt}
        type={type}
        objectId={id}
      />
    </>
  );
}
