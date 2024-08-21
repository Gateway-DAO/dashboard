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

export default function getOrganizationOrUserData(user: any): GatewayProfile {
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
