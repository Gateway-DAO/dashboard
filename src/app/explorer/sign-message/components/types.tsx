import { Network } from '@/types/web3';

export type SignButtonsProps = {
  message: string;
  onSign: (address: string, signature: string, network: Network) => void;
  onError: (error: string, network: Network) => void;
};
