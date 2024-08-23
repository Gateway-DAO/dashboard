import { useEffect, useRef } from 'react';

type Props = {
  visible: boolean;
  connecting?: boolean;
  address?: string;
  onConnect: () => void;
  disconnect: () => void;
};

export default function useConnectHandler({
  address,
  visible,
  connecting,
  onConnect,
  disconnect,
}: Props) {
  const wasVisible = useRef(false);

  useEffect(() => {
    if (visible && !wasVisible.current) {
      wasVisible.current = true;
    }
    if (address && wasVisible.current) {
      onConnect();
    }
    if (address && !connecting && !visible && !wasVisible.current) {
      disconnect();
    }
    if (!address && !visible && wasVisible.current) {
      console.log('just closed');
    }
  }, [address, visible, onConnect]);
}
