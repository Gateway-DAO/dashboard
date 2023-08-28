import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Organization } from "@/services/protocol/types";
import { PartialDeep } from "type-fest";

type UseOrganizationTruthyResponse = {
  isOrg: true;
  pathnameOrg: string;
  organization: PartialDeep<Organization>;
}

type UseOrganizationFalsyResponse = {
  isOrg: false;
  pathnameOrg: undefined;
  organization: undefined;
}

/**
 * Hook to get the organization from the session, based on the current URL.
 *
 * @returns {Object} The organization object.
 * @returns {boolean} The isOrg boolean.
 * @returns {string} The pathnameOrg string.
 */
export default function useOrganization (): UseOrganizationTruthyResponse | UseOrganizationFalsyResponse {
  const { data: session } = useSession()
  const pathname = usePathname();
  const isOrg = pathname.includes("/dashboard/org/");
  const pathnameOrg = isOrg ? pathname.split("/")[3] : undefined;
  const organization = session?.user?.accesses?.find((access) => access.organization?.gatewayId === pathnameOrg)?.organization;

  if (isOrg && pathnameOrg && organization) {
    return {
      isOrg,
      pathnameOrg,
      organization,
    }
  }

  return {
    isOrg: false,
    pathnameOrg: undefined,
    organization: undefined,
  }
}
