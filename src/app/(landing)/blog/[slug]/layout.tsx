'use client';

import { useRef } from 'react';

import styles from './layout.module.scss';

export default function BlogView({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className={styles.element} ref={sectionRef}>
      {children}
    </section>
  );
}
