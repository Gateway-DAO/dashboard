import { common } from '@/locale/en/common';
import { IdentifierType } from '@/services/protocol-v3/types';

export const useIdentifierTypes = () => {
  const identifierTypes = [
    {
      value: IdentifierType.Username,
      name: common.identifier.types.gateway_id,
    },
    {
      value: IdentifierType.UserDid,
      name: common.identifier.types.did,
    },
  ];
  return identifierTypes;
};
