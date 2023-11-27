import { transaction_actions } from '@/locale/en/transaction';
import { TransactionAction } from '@/services/protocol/types';

export default function ActionDetail({
  action,
}: {
  action: TransactionAction;
}) {
  const getDetail = (): string => {
    switch (action) {
      case TransactionAction.UserCreate:
        return transaction_actions.user_create;
      case TransactionAction.PdaIssuance:
        return transaction_actions.pda_issuance;
      case TransactionAction.PdaUpdate:
        return transaction_actions.pda_update;
      case TransactionAction.PdaStatusChange:
        return transaction_actions.pda_status_change;
      case TransactionAction.DatamodelCreate:
        return transaction_actions.data_model;
      case TransactionAction.OrganizationCreate:
        return transaction_actions.org_create;
      case TransactionAction.OrganizationUpdate:
        return transaction_actions.org_update;
      case TransactionAction.ProofCreate:
        return transaction_actions.proof_create;
      case TransactionAction.ProofStatusChange:
        return transaction_actions.proof_status_change;
      case TransactionAction.RequestCreate:
        return transaction_actions.request_create;
      case TransactionAction.RequestStatusChange:
        return transaction_actions.request_status_change;
      case TransactionAction.RequestTemplateCreate:
        return transaction_actions.request_template;
      case TransactionAction.MoneyDeposit:
        return transaction_actions.money_deposit;
      default:
        return action;
    }
  };
  return <>{getDetail()}</>;
}
