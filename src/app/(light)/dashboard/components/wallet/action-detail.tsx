import { financial_transaction_actions } from '@/locale/en/transaction';
import { FinancialTransactionAction } from '@/services/protocol/types';

export default function FinancialActionDetail({
  action,
}: {
  action: FinancialTransactionAction;
}) {
  const getDetail = (): string => {
    switch (action) {
      case FinancialTransactionAction.IssuerEarnings:
        return financial_transaction_actions.in.pda_revenue;
      case FinancialTransactionAction.MoneyDeposit:
        return financial_transaction_actions.in.deposit;
      case FinancialTransactionAction.MoneyWithdraw:
        return financial_transaction_actions.out.withdraw;
      case FinancialTransactionAction.ProofCreate:
        return financial_transaction_actions.out.proof_share;
      case FinancialTransactionAction.PdaIssuance:
        return financial_transaction_actions.out.pda_issuance;
      case FinancialTransactionAction.PdaUpdate:
        return financial_transaction_actions.out.pda_update;
      case FinancialTransactionAction.PdaStatusChange:
        return financial_transaction_actions.out.pda_status_change;
      case FinancialTransactionAction.DatamodelCreate:
        return financial_transaction_actions.out.data_model;
      case FinancialTransactionAction.RequestTemplateCreate:
        return financial_transaction_actions.out.data_request_template;
      case FinancialTransactionAction.RequestCreate:
        return financial_transaction_actions.out.request_cost;
      default:
        return action;
    }
  };
  return <>{getDetail()}</>;
}
