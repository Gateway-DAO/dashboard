import { ReactNode, useEffect, useRef } from 'react';

import gsap from 'gsap';
import { InView } from 'react-intersection-observer';

import useMobileDetect from '../../hooks/use-mobile.detect';
import {
  calculateLines,
  findClosestNumbersWithIndices,
  spliWordsBySpan,
} from '../../utils/dom';

type Props = {
  children?: ReactNode;
  textClassName?: string;
  lineClassName?: string;
};

export default function AnimatedTextsInview({
  children,
  textClassName,
  lineClassName,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const { isMobile } = useMobileDetect();

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

    wordsCloseToBreakLine.forEach((word) => {
      console.log(spans[word.index]);
    });

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
      wordContainer.classList.add(lineClassName || '');
      word.forEach((span) => {
        wordContainer.appendChild(document.createTextNode(' '));
        wordContainer.appendChild(span);
      });
      ref.current!.appendChild(wordContainer);
    });
  };

  useEffect(() => {
    if (!ref.current) return;
    console.log('a', children);
    splitTextintoLines(ref.current);
  }, []);

  const handleInviewAnimation = (inView: boolean) => {
    const lines = ref.current!.querySelectorAll('[data-line]');
    gsap.killTweensOf('[data-word]');
    if (inView) {
      lines.forEach((line, index) => {
        const letters = line.querySelectorAll('[data-word]');

        if (isMobile) {
          gsap.to(letters, {
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            stagger: 0.1,
          });
        } else {
          gsap.to(letters, {
            yPercent: 0,
            duration: 1.5,
            ease: 'power3.inOut',
            delay: index * 0.1,
          });
        }
      });
    } else {
      lines.forEach((line, index) => {
        const letters = line.querySelectorAll('[data-word]');

        if (isMobile) {
          gsap.set(letters, { autoAlpha: 0 });
        } else {
          gsap.set(letters, { yPercent: 100 });
        }
      });
    }
  };

  return (
    <InView as="p" className={textClassName} onChange={handleInviewAnimation}>
      <span ref={ref}>{children}</span>
    </InView>
  );
}
