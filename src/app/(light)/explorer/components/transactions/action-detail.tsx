import { transaction_actions } from '@/locale/en/transaction';
import { ActivityAction } from '@/services/protocol-v3/types';

export default function ActionDetail({ action }: { action: ActivityAction }) {
  const getDetail = (): string => {
    switch (action) {
      case ActivityAction.UserCreate:
        return transaction_actions.user_create;
      case ActivityAction.PdaIssuance:
        return transaction_actions.pda_issuance;
      case ActivityAction.PdaUpdate:
        return transaction_actions.pda_update;
      case ActivityAction.PdaStatusChange:
        return transaction_actions.pda_status_change;
      case ActivityAction.DatamodelCreate:
        return transaction_actions.data_model;
      case ActivityAction.OrganizationCreate:
        return transaction_actions.org_create;
      case ActivityAction.OrganizationUpdate:
        return transaction_actions.org_update;
      case ActivityAction.ProofCreate:
        return transaction_actions.proof_create;
      case ActivityAction.ProofStatusChange:
        return transaction_actions.proof_status_change;
      case ActivityAction.RequestCreate:
        return transaction_actions.request_create;
      case ActivityAction.RequestStatusChange:
        return transaction_actions.request_status_change;
      case ActivityAction.RequestTemplateCreate:
        return transaction_actions.request_template;
      default:
        return action;
    }
  };
  return <>{getDetail()}</>;
}
