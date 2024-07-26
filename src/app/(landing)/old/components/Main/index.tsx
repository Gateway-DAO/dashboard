'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

import gsap from 'gsap';

import styles from './main.module.scss';

type Props = {
  children: ReactNode;
};

export default function Main({ children }: Props) {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.to(mainRef.current, { opacity: 1, duration: 0.3 });
  }, [pathname]);

  return (
    <main className={styles.element} ref={mainRef}>
      {children}
    </main>
  );
}
