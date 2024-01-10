import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children?: React.ReactNode;
  portalSelector?: HTMLElement;
};

export default function Portal({ children, portalSelector }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, portalSelector || document.body)
    : null;
}
