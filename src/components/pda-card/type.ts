import { PdaStatus } from '@/services/protocol/types';

export type PdaCardProps = {
  dashed?: boolean;
  href?: string;
  onClick?: () => void;
  userName: string;
  userImage?: string | null;
  name: string;
  status: PdaStatus;
};
