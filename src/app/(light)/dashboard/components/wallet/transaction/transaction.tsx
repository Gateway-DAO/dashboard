import TransactionCardInfo from './components/transaction-card-info';
import TransactionCardTitle from './components/transaction-card-title';

export function Transaction() {
  return (
    <>
      <TransactionCardTitle value={0.3} />
      <TransactionCardInfo
        title="PDA consumption revenue"
        id="hBJgUy-PENp984SYvTB282Z_loIlTqo3774cU0NPpVs"
        date="2023-10-25T10:58:14Z"
        type="earning"
      />
    </>
  );
}
