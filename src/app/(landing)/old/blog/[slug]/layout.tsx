'use client';

import { useRef } from 'react';

import useHeaderVariantDetection from '@/app/(landing)/old/hooks/use-header-variant-detection';

import styles from './layout.module.scss';

export default function BlogView({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');
  return (
    <section className={styles.element} ref={sectionRef}>
      {children}
    </section>
  );
}
