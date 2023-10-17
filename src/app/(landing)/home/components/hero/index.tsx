'use client';
import { useEffect, useRef } from 'react';

import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { splitSpans } from '@/app/(landing)/utils/dom';
import GTWLink from '@/components/gtw-link';
import gsap from 'gsap';

import styles from './hero.module.scss';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const refCurrentWordElement = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = ['create', 'transfer', 'update'];

  useEffect(() => {
    if (!wordsRef.current.length) return;

    const wordsSplitted = wordsRef.current.map((word) => splitSpans(word!));

    gsap.set(refCurrentWordElement.current, {
      width: wordsRef.current[0]!.offsetWidth,
      opacity: 1,
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.set(wordsSplitted[0], { y: 0 });

    wordsSplitted.forEach((word, index) => {
      tl.to(word, {
        autoAlpha: 0,
        duration: 0.6,
        y: -20,
        stagger: 0.05,
        delay: 2,
      })
        .set(word, { y: 0 })
        .to(
          refCurrentWordElement.current,
          {
            width:
              wordsRef.current[
                index + 1 === wordsSplitted.length ? 0 : index + 1
              ]!.offsetWidth,
            duration: 0.3,
          },
          '-=0.7'
        )
        .fromTo(
          wordsSplitted[index + 1 === wordsSplitted.length ? 0 : index + 1],
          { y: 20 },
          {
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.05,
            y: 0,
          },
          '<'
        );
    });
  }, []);

  useHeaderVariantDetection(sectionRef, 'light');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.title}>
          The safer and faster <br />
          way for you to&nbsp;
          <span
            className={styles.title_highlight}
            ref={refCurrentWordElement}
            style={{ color: '#70ECFE', opacity: 0 }}
          >
            {words.map((word, index) => (
              <span
                className={styles.word}
                key={index}
                ref={(ref) => (wordsRef.current[index] = ref)}
              >
                {word}
              </span>
            ))}
          </span>
          &nbsp;
          <br />
          private data
        </h1>
        <p className={styles.text}>
          Gateway powers private data usage across the web <br />
          for organizations, users, and applications.
        </p>

        <div className={styles.buttons_container}>
          <GTWLink href="/">
            <Button variant="contained">Try it now</Button>
          </GTWLink>

          <GTWLink href="/">
            <Button variant="text">See how it works</Button>
          </GTWLink>
        </div>
      </Wrapper>
    </section>
  );
}
