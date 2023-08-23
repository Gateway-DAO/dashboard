import { Chain } from '@/services/protocol/types';

export type PdaCardProps = {
    dashed?: boolean;
    href: string;
    chain: Chain;
    name: string;
    image?: string | null;
    status: string;
};
