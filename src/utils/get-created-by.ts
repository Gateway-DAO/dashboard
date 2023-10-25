import { Organization, User } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export default function getCreatedBy(
  user: PartialDeep<
    Pick<User, 'id' | 'gatewayId' | 'displayName' | 'profilePicture'>
  >,
  organization?:
    | PartialDeep<Pick<Organization, 'id' | 'gatewayId' | 'name' | 'image'>>
    | null
    | undefined
) {
  if (organization) {
    return {
      id: organization.id,
      gatewayId: organization.gatewayId,
      name: organization.name,
      image: organization.image,
    };
  }

  return {
    id: user.id,
    gatewayId: user.gatewayId,
    name: user.displayName,
    image: user.profilePicture,
  };
}
