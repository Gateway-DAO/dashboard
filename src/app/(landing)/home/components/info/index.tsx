import { useEffect, useRef } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import { splitSpans } from '@/app/(landing)/utils/dom';
import LenisManager from '@/app/(landing)/utils/scroll';
import gsap from 'gsap';
import { InView } from 'react-intersection-observer';

import styles from './info.module.scss';

export default function Info() {
  const { setVariant } = useHeaderContext();
  const sectionRef = useRef<HTMLElement>(null);
  const slashRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    splitSpans(textRef.current, (spans) => {
      const parent = (textRef.current as HTMLElement)
        .parentNode as HTMLParagraphElement;
      const { height } = parent.getBoundingClientRect();
      gsap.set(parent, { height });
      gsap.set(spans, { display: 'none' });
    });

    letters.current = Array.from(
      textRef.current.querySelectorAll('span')
    ) as HTMLSpanElement[];

    LenisManager?.on('scroll', () => {
      if (!sectionRef.current) return;

      const bounds = sectionRef.current.getBoundingClientRect();
      const { top } = bounds;

      if (top >= 0 && top <= 20) {
        setVariant('dark');
      }
    });
  }, []);

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper className={styles.wrapper}>
        <InView
          as="p"
          className={styles.text}
          onChange={(inView) => {
            if (inView && letters.current.length) {
              gsap.to(letters.current, {
                display: 'inline',
                stagger: 0.06,
                delay: 0.8,
              });
            } else {
              gsap.killTweensOf(letters.current);
              gsap.set(letters.current, { display: 'none' });
            }
          }}
        >
          <span ref={textRef}>
            We’re breaking the barriers of traditional data centralization,
            immobility, and accessibility
          </span>
          <span ref={slashRef} className={styles.type_slash}>
            _
          </span>
        </InView>
      </Wrapper>
    </section>
  );
}
