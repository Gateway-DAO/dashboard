import { Auth, AuthType, Chain } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

export const getWalletFromAuthenticationsByChain = (
  authentications: PartialDeep<Auth>[] | null,
  type: Chain
) => {
  try {
    return (
      authentications
        ?.filter(
          (auth) => auth.type === AuthType.Wallet && auth.data?.chain === type
        )
        .map((auth) => auth.data?.address)
        .find((wallet) => wallet) ?? ''
    );
  } catch (error) {
    return '';
  }
};
