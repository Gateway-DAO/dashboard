import { RefObject, useEffect } from 'react';

import { useHeaderContext } from '../contexts/header-context';
import LenisManager from '../utils/scroll';

export default function useHeaderVariantDetection(
  sectionRef: RefObject<HTMLElement>,
  variant: 'dark' | 'light'
) {
  const { setVariant } = useHeaderContext();
  useEffect(() => {
    LenisManager?.on('scroll', () => {
      if (!sectionRef.current) return;

      const { top, bottom } = sectionRef.current.getBoundingClientRect();

      if (top <= 0 && bottom >= 100) {
        setVariant(variant);
      }
    });
  }, []);
}
