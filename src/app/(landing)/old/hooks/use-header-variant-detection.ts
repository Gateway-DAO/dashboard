import { RefObject } from 'react';

import { useLenis } from '@studio-freight/react-lenis';

import { useHeaderContext } from '../contexts/header-context';

export default function useHeaderVariantDetection(
  sectionRef: RefObject<HTMLElement>,
  variant: 'dark' | 'light'
) {
  const { setVariant } = useHeaderContext();

  useLenis(() => {
    if (!sectionRef.current) return;

    // TODO: Improve it using IntersectionObserver
    const { top, bottom } = sectionRef.current.getBoundingClientRect();

    if (top <= 0 && bottom >= 100) {
      setVariant(variant);
    }
  });
}
