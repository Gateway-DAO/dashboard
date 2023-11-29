import { Organization, User } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export type GatewayProfile = {
  id: string;
  gatewayId: string;
  name?: string | null;
  image?: string | null;
  verified?: boolean | null;
  createdAt?: string | null;
  isOrganization: boolean;
};

export default function getOrganizationOrUserData(
  user: PartialDeep<
    Pick<
      User,
      'id' | 'gatewayId' | 'displayName' | 'profilePicture' | 'createdAt'
    >
  >,
  organization?:
    | PartialDeep<
        Pick<
          Organization,
          'id' | 'gatewayId' | 'name' | 'image' | 'verified' | 'createdAt'
        >
      >
    | null
    | undefined
): GatewayProfile {
  if (organization) {
    return {
      id: organization.id!,
      gatewayId: organization.gatewayId!,
      name: organization.name,
      image: organization.image,
      verified: organization.verified,
      createdAt: organization.createdAt,
      isOrganization: true,
    };
  }

  return {
    id: user.id!,
    gatewayId: user.gatewayId!,
    name: user.displayName,
    image: user.profilePicture,
    createdAt: user.createdAt,
    isOrganization: false,
  };
}
