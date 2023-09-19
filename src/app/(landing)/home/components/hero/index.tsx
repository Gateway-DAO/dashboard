'use client';
import { useEffect, useState, useRef } from 'react';

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

    let currentIndex = 0;

    const wordsSplitted = wordsRef.current.map((word) => splitSpans(word!));

    gsap.set(refCurrentWordElement.current, {
      width: wordsRef.current[currentIndex]!.offsetWidth,
    });

    const changeWord = () => {
      gsap.to(wordsSplitted[currentIndex], {
        autoAlpha: 0,
        duration: 0.6,
        y: -20,
        stagger: 0.05,
      });

      currentIndex = currentIndex === words.length - 1 ? 0 : currentIndex + 1;

      gsap.to(refCurrentWordElement.current, {
        width: wordsRef.current[currentIndex]!.offsetWidth,
        duration: 0.3,
        delay: 0.5,
      });

      gsap.fromTo(
        wordsSplitted[currentIndex],
        { y: 20 },
        {
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.05,
          y: 0,
          delay: 0.2,
        }
      );
    };

    const interval = setInterval(changeWord, 4000);

    return () => clearInterval(interval);
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
            style={{ color: '#70ECFE' }}
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
          Gateway is the foundation to securely create, own, manage, <br />
          and verify private data assets (PDAs) across the digital world.
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
