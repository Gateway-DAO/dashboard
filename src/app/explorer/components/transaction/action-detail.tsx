import { transaction_actions } from '@/locale/en/transaction';
import { mockTransactionType } from '@/services/api/mocks';

export default function ActionDetail({
  action,
}: {
  action: mockTransactionType;
}) {
  switch (action) {
    case mockTransactionType.PdaIssuance:
      return transaction_actions.pda_issuance;

    default:
      return action;
  }
}
