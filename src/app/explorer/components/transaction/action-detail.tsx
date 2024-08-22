import { transaction_actions } from '@/locale/en/transaction';
import { mockTransactionType } from '@/services/api/mock-types';

export default function ActionDetail({ action }: { action: mockTransactionType }) {
  const getDetail = (): string => {
    switch (action) {
      case mockTransactionType.PdaIssuance:
        return transaction_actions.pda_issuance;

      default:
        return action;
    }
  };
  return <>{getDetail()}</>;
}
