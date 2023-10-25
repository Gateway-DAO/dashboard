import TransactionCardInfo from './components/transaction-card-info';
import TransactionCardTitle from './components/transaction-card-title';

type Props = {
  id: string;
  metadata: any;
  type: string;
  amount: number;
  object_id: string;
};

export function Transaction({ id, metadata, type, amount, object_id }: Props) {
  const { name, date } = metadata;

  return (
    <>
      <TransactionCardTitle value={amount} />
      <TransactionCardInfo
        title={name}
        id={id}
        date={date}
        type={type}
        objectId={object_id}
      />
    </>
  );
}
