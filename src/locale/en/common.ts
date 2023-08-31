import { Chain } from '@/services/protocol/types';

export const common = {
  chain: {
    EVM: 'Ethereum',
    SOL: 'Solana',
  } as Record<Chain, string>,
  actions: {
    share_now: 'Share now',
    share_a_copy: 'Share a copy',
    revoke_access: 'Revoke access',
    hide_activity: 'Hide Activity',
    show_activity: 'See Activity',
    check_now: 'Check now',
    copy_url: 'Copy URL',
    connect_now: 'Connect now',
  },
};
