import { transaction_actions } from '@/locale/en/transaction';
import { FinancialTransactionAction } from '@/services/protocol/types';

export default function ActionDetail({
  action,
}: {
  action: FinancialTransactionAction;
}) {
  const getDetail = (): string => {
    switch (action) {
      case FinancialTransactionAction.PdaIssuance:
        return transaction_actions.out.pda_issuance;
      case FinancialTransactionAction.PdaUpdate:
        return transaction_actions.out.pda_update;
      case FinancialTransactionAction.PdaStatusChange:
        return transaction_actions.out.pda_status_change;
      default:
        return '';
    }
  };
  return <>{getDetail()}</>;
}
