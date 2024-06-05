import { session } from '@/mocks/session';

import { getSessionOrg } from '../currentOrg';

jest.mock('@/services/next-auth/get-gtw-server-session', () => ({
  getGtwServerSession: jest.fn(async () => session),
}));

describe('currentOrg test', () => {
  it('shoud get current org from session', async () => {
    const organization = session.user.accesses![0].organization;
    const currentOrg = await getSessionOrg(organization.did!);
    expect(currentOrg?.did).toBe(organization.did);
  });
});
