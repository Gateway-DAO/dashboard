import TransactionCardInfo from './transaction-card-info';
import TransactionCardTitle from './transaction-card-title';

type Props = {
  id: string;
  metadata: any;
  type: string;
  amount: number;
  object_id: string;
  date: string;
  action: string;
};

export function Transaction({
  id,
  metadata,
  type,
  action,
  amount,
  object_id,
  date,
}: Props) {
  const { name } = metadata;

  return (
    <>
      <TransactionCardTitle amount={amount} type={type} />
      <TransactionCardInfo
        title={name}
        id={id}
        action={action}
        date={date}
        type={type}
        objectId={object_id}
      />
    </>
  );
}
