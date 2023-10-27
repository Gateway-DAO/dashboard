import { Organization, User } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export type GatewayProfile = {
  id: string;
  gatewayId: string;
  name?: string | null;
  image?: string | null;
};

export default function getOrganizationOrUserData(
  user: PartialDeep<
    Pick<User, 'id' | 'gatewayId' | 'displayName' | 'profilePicture'>
  >,
  organization?:
    | PartialDeep<Pick<Organization, 'id' | 'gatewayId' | 'name' | 'image'>>
    | null
    | undefined
): GatewayProfile {
  if (organization) {
    return {
      id: organization.id!,
      gatewayId: organization.gatewayId!,
      name: organization.name,
      image: organization.image,
    };
  }

  return {
    id: user.id!,
    gatewayId: user.gatewayId!,
    name: user.displayName,
    image: user.profilePicture,
  };
}
