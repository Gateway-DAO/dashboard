import { Organization, User } from '@/services/protocol/types';
import { Nullable } from '@/types/helpers';

export default function getCreatedBy(
  user: Nullable<
    Pick<User, 'id' | 'gatewayId' | 'displayName' | 'profilePicture'>
  >,
  organization?:
    | Nullable<Pick<Organization, 'id' | 'gatewayId' | 'name' | 'image'>>
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
