import { Chain } from '@/services/protocol/types';

export const common = {
  chain: {
    EVM: 'Ethereum',
    SOL: 'Solana',
  } as Record<Chain, string>,
  actions: {
    share_a_copy: 'Share a copy',
    revoke_access: 'Revoke access',
    hide_activity: 'Hide Activity',
    show_activity: 'See Activity',
  },
};
