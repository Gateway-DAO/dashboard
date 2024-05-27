import { financial_transaction_actions } from '@/locale/en/transaction';
import { FinancialTransactionAction } from '@/services/protocol/types';

const actions = {
  [FinancialTransactionAction.IssuerEarnings]:
    financial_transaction_actions.in.pda_revenue,
  [FinancialTransactionAction.MoneyDeposit]:
    financial_transaction_actions.in.deposit,
  [FinancialTransactionAction.MoneyWithdraw]:
    financial_transaction_actions.out.withdraw,
  [FinancialTransactionAction.ProofCreate]:
    financial_transaction_actions.out.proof_share,
  [FinancialTransactionAction.PdaIssuance]:
    financial_transaction_actions.out.pda_issuance,
  [FinancialTransactionAction.PdaUpdate]:
    financial_transaction_actions.out.pda_update,
  [FinancialTransactionAction.PdaStatusChange]:
    financial_transaction_actions.out.pda_status_change,
  [FinancialTransactionAction.DatamodelCreate]:
    financial_transaction_actions.out.data_model,
  [FinancialTransactionAction.RequestTemplateCreate]:
    financial_transaction_actions.out.data_request_template,
  [FinancialTransactionAction.RequestCreate]:
    financial_transaction_actions.out.request_cost,
};

export default function FinancialActionDetail({
  action,
}: {
  action: FinancialTransactionAction;
}) {
  return <>{actions?.[action as keyof typeof actions] ?? action}</>;
}
