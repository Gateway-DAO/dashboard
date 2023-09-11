'use client';
import { useEffect, useState, useRef } from 'react';

import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';
import GTWLink from '@/components/gtw-link';
import gsap from 'gsap';

import styles from './hero.module.scss';

export default function Hero() {
  const [currentWord, setCurrentWord] = useState<string>('create');
  const refCurrentWordElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const words = ['create', 'transfer', 'update'];
    let currentIndex = 0;

    const changeWord = () => {
      currentIndex = currentIndex === words.length - 1 ? 0 : currentIndex + 1;

      const tl = gsap.timeline();
      tl.to(refCurrentWordElement.current, { autoAlpha: 0, duration: 0.3 });
      tl.call(() => {
        setCurrentWord(words[currentIndex]);
      });
      tl.to(refCurrentWordElement.current, { autoAlpha: 1, duration: 0.3 });
    };

    const interval = setInterval(changeWord, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.element}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.title}>
          <span className={styles.title_line}>The safer and faster</span>
          <span className={styles.title_line}>
            way for you to{' '}
            <span ref={refCurrentWordElement} style={{ color: '#70ECFE' }}>
              {currentWord}
            </span>
          </span>
          <span className={styles.title_line}>private data</span>
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
