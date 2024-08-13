'use client';

import { useRef } from 'react';

import {
  ValueAnimationTransition,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from 'framer-motion';

type Props = {
  from: number;
  to: number;
  options?: ValueAnimationTransition<number>;
  once?: boolean;
};

export default function AnimatedCounter({
  from,
  to,
  options,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!inView) return;

    // Set initial value
    element.textContent = String(from);

    // If reduced motion is enabled in system's preferences
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.textContent = String(to);
      return;
    }

    const controls = animate(from, to, {
      duration: 1,
      ease: 'easeOut',
      ...options,
      onUpdate(value) {
        element.textContent = Math.floor(value).toLocaleString('en-US');
      },
    });

    // Cancel on unmount
    return () => {
      controls.stop();
    };
  }, [ref, inView, from, to]);

  return <span ref={ref} />;
}
