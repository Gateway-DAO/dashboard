import { MouseEvent, useCallback, useMemo, useState } from 'react';

/**
 * Helper hook for managing the state of the MUI menu
 *
 * It stores the element that opens the menu to be able to track it's position
 */
export function useMenu() {
  const [element, setElement] = useState<null | HTMLElement>(null);
  const isOpen = useMemo(() => !!element, [element]);
  const onOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setElement(event.currentTarget);
  }, []);
  const onClose = useCallback(() => {
    setElement(null);
  }, []);
  return {
    element,
    isOpen,
    onOpen,
    onClose,
  };
}
