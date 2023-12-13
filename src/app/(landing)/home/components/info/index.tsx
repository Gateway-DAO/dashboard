import { useEffect, useRef } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import {
  calculateLines,
  findClosestNumbersWithIndices,
  spliWordsBySpan,
} from '@/app/(landing)/utils/dom';
import gsap from 'gsap';
import { InView } from 'react-intersection-observer';

import styles from './info.module.scss';

export default function Info() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const splitTextintoLines = (parent: HTMLElement) => {
    // Step 1: Calculate lines and split the text into spans
    const lines = calculateLines(parent);
    const spans = spliWordsBySpan(parent);

    // Step 2: Get the right bounds of each span
    const wordsRights = spans.map((span) => span.getBoundingClientRect().right);

    // Step 3: Find words close to the line breaks
    const wordsCloseToBreakLine = findClosestNumbersWithIndices(
      wordsRights,
      parent.getBoundingClientRect().right,
      lines
    );

    // Step 4: Group spans into words
    const words: HTMLSpanElement[][] = [];
    wordsCloseToBreakLine.forEach((word, index) => {
      const startIndex =
        index === 0 ? 0 : wordsCloseToBreakLine[index - 1].index + 1;
      const endIndex = word.index + 1;
      const wordSpans = spans.slice(startIndex, endIndex);
      words.push(wordSpans);
    });

    // Step 5: Replace the content of the container with spans
    parent.innerHTML = '';
    words.forEach((word) => {
      const wordContainer = document.createElement('span');
      wordContainer.setAttribute('data-line', '');
      wordContainer.classList.add(styles.line);
      word.forEach((span) => {
        wordContainer.appendChild(document.createTextNode(' '));
        wordContainer.appendChild(span);
      });
      textRef.current!.appendChild(wordContainer);
    });
  };

  useEffect(() => {
    if (!textRef.current) return;
    splitTextintoLines(textRef.current);
  }, []);

  useHeaderVariantDetection(sectionRef, 'dark');

  const handleInviewAnimation = (inView: boolean) => {
    const lines = textRef.current!.querySelectorAll('[data-line]');
    gsap.killTweensOf('[data-word]');
    if (inView) {
      lines.forEach((line, index) => {
        const letters = line.querySelectorAll('[data-word]');

        if (window.innerWidth <= 1199) {
          gsap.to(letters, {
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            stagger: 0.1,
          });
        } else {
          gsap.to(letters, {
            yPercent: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: (index + 0.5) * 0.15,
          });
        }
      });
    } else {
      lines.forEach((line, index) => {
        const letters = line.querySelectorAll('[data-word]');

        if (window.innerWidth <= 1199) {
          gsap.set(letters, { autoAlpha: 0 });
        } else {
          gsap.set(letters, { yPercent: 100 });
        }
      });
    }
  };

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper className={styles.wrapper}>
        <InView as="p" className={styles.text} onChange={handleInviewAnimation}>
          <span className={styles.text} ref={textRef}>
            We’re breaking the barriers of traditional data centralization,
            immobility, and accessibility
          </span>
        </InView>
      </Wrapper>
    </section>
  );
}
