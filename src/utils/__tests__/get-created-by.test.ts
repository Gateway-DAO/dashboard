import { Organization, User } from '@/services/protocol/types';
import getCreatedBy from '../get-created-by';

const user: Required<
  Pick<User, 'id' | 'gatewayId' | 'displayName' | 'profilePicture'>
> = {
  id: 'user-id',
  gatewayId: 'user-gateway-id',
  displayName: 'user-display-name',
  profilePicture: 'user-profile-picture',
};

describe('Get "Created By" Helper', () => {
  test('return organization if exists', () => {
    const organization: Required<
      Pick<Organization, 'id' | 'gatewayId' | 'name' | 'image'>
    > = {
      id: 'organization-id',
      gatewayId: 'organization-gateway-id',
      name: 'organization-name',
      image: 'organization-image',
    };

    const result = getCreatedBy(user, organization);

    expect(result).toEqual(organization);
  });
  test('return user if organization does not exist', () => {
    const organization = null;
    const result = getCreatedBy(user, organization);

    expect(result).toEqual({
      id: user.id,
      gatewayId: user.gatewayId,
      name: user.displayName,
      image: user.profilePicture,
    });
  });
});
