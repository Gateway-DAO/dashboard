import { Organization, User } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { limitCharsCentered } from './string';

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
      gatewayId: organization.gatewayId! ?? limitCharsCentered(user.id!, 10),
      name:
        organization.name ??
        user.gatewayId ??
        limitCharsCentered(organization.id!, 10),
      image: organization.image,
      verified: organization.verified,
      createdAt: organization.createdAt,
      isOrganization: true,
    };
  }

  return {
    id: user.id!,
    gatewayId: user.gatewayId! ?? limitCharsCentered(user.id!, 10),
    name:
      user.displayName ?? user.gatewayId ?? limitCharsCentered(user.id!, 10),
    image: user.profilePicture,
    createdAt: user.createdAt,
    isOrganization: false,
  };
}
