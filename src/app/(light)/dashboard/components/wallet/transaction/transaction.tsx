import TransactionCardInfo from './components/transaction-card-info';
import TransactionCardTitle from './components/transaction-card-title';

type Props = {
  id: string;
};

export function Transaction({ id }: Props) {
  // MOCK - GET TRANSACTION BY ID
  const title = 'PDA consumption revenue';
  const date = '2023-10-25T10:58:14Z';
  const type = 'earning';
  const value = 0.3;
  const pdaId = 'asdw23-ascese-32dadcdf';

  return (
    <>
      <TransactionCardTitle value={value} />
      <TransactionCardInfo
        title={title}
        id={id}
        date={date}
        type={type}
        pdaId={pdaId}
      />
    </>
  );
}
