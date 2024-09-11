import { useCallback, useEffect, useRef } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function useSolConnectHandler(
  onConnect: (address: string) => void
) {
  const { setVisible, visible } = useWalletModal();

  const { publicKey, disconnect } = useWallet();
  const address = publicKey?.toString();

  const wasVisible = useRef(false);

  useEffect(() => {
    if (visible && !wasVisible.current) {
      wasVisible.current = true;
    }
    if (address && wasVisible.current) {
      onConnect(address);
    }
    if (address && !visible && !wasVisible.current) {
      disconnect();
    }
  }, [address, visible, onConnect]);

  const onOpenModal = useCallback(() => setVisible(true), [setVisible]);

  return onOpenModal;
}
