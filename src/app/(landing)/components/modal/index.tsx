import { ReactNode, useEffect, useRef } from 'react';

import gsap from 'gsap';

import { useIsFirstRender } from '../../hooks/use-is-first-render';
import { useLenisS } from '../../libs/lenis-provider';
import { joinClasses } from '../../utils/function';
import styles from './modal.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
};

export default function Modal({
  children,
  className,
  active,
  setActive,
}: Props) {
  const isFirstRender = useIsFirstRender();
  const modalRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisS();
  useEffect(() => {
    if (isFirstRender || !modalRef.current) return;

    if (active) {
      lenis?.stop();
      gsap.to(modalRef.current, { zIndex: 5, autoAlpha: 1 });
    } else {
      gsap.to(modalRef.current, {
        autoAlpha: 0,
        onComplete: () => {
          gsap.set(modalRef.current, { zIndex: -1 });
          lenis?.start();
        },
      });
    }
  }, [active]);
  return (
    <div className={joinClasses(styles.element, className)} ref={modalRef}>
      <button className={styles.close_button} onClick={() => setActive(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            fill="#fff"
            d="M14 1.41 12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41Z"
          />
        </svg>
      </button>
      <div className={styles.content} data-modal-content>
        {children}
      </div>
    </div>
  );
}
