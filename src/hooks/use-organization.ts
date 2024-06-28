import { Organization, OrganizationRole } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

type UseOrganizationTruthyResponse = {
  isOrg: true;
  pathnameOrg: string;
  canEdit: boolean;
  role: OrganizationRole;
  organization: PartialDeep<Organization>;
};

type UseOrganizationFalsyResponse = {
  [key in keyof Omit<UseOrganizationTruthyResponse, 'isOrg'>]: undefined;
} & {
  isOrg: false;
};

/**
 * Hook to get the organization from the session, based on the current URL.
 *
 * @returns {Object} The organization object.
 * @returns {boolean} The isOrg boolean.
 * @returns {string} The pathnameOrg string.
 */
export default function useOrganization():
  | UseOrganizationTruthyResponse
  | UseOrganizationFalsyResponse {
  return {
    isOrg: false,
    pathnameOrg: undefined,
    organization: undefined,
    canEdit: undefined,
    role: undefined,
  };
}
