import { PdaStatus } from '@/services/protocol-v3/types';

export type PdaCardProps = {
  id: string;
  dashed?: boolean;
  href?: string;
  onClick?: () => void;
  userName: string;
  userId: string;
  userImage?: string | null;
  name: string;
  status: PdaStatus;
  educational?: boolean;
};
