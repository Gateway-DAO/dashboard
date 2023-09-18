import { useEffect, useRef } from 'react';

import { useIsFirstRender } from '@/app/(landing)/hooks/use-is-first-render';
import { joinClasses } from '@/app/(landing)/utils/function';
import gsap from 'gsap';

import styles from './burger-button.module.scss';

type Props = {
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function BurgerButton({ active, onClick, className }: Props) {
  const tl = useRef<gsap.core.Timeline>();
  const refSpansOpen = useRef<(HTMLSpanElement | null)[]>([]);
  const refSpansClose = useRef<(HTMLSpanElement | null)[]>([]);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .to(refSpansOpen.current, { scaleX: 0, duration: 0.2 })
      .to(refSpansClose.current, { autoAlpha: 1, duration: 0.2 });
  }, []);

  useEffect(() => {
    if (isFirstRender || !tl.current) return;

    tl.current.pause(0);

    if (active) {
      tl.current.play();
    } else {
      tl.current.reverse(0);
    }
  }, [active]);

  return (
    <button
      className={joinClasses(styles.element, className)}
      onClick={onClick}
    >
      <span className={styles.container}>
        <span
          className={styles.line}
          ref={(ref) => (refSpansOpen.current[0] = ref)}
        />
        <span
          className={styles.line}
          ref={(ref) => (refSpansOpen.current[1] = ref)}
        />
        <span
          className={styles.line}
          ref={(ref) => (refSpansOpen.current[2] = ref)}
        />
        <span
          className={styles.line}
          ref={(ref) => (refSpansClose.current[0] = ref)}
        />
        <span
          className={styles.line}
          ref={(ref) => (refSpansClose.current[1] = ref)}
        />
      </span>
    </button>
  );
}
