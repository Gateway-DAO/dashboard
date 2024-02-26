import Wrapper from '@/app/(landing)/components/wrapper';
import styles from './cta.module.scss';
import { InView } from 'react-intersection-observer';
import Button from '@/app/(landing)/components/button';
import { useEffect, useRef } from 'react';
import { spliWordsBySpan } from '@/app/(landing)/utils/dom';
import { DOCS_BASE_URL } from '@/constants/docs';
import gsap from 'gsap';
import Link from '@/app/(landing)/components/Link';
import { joinClasses } from '@/app/(landing)/utils/function';

function splitElementByBrTag(element: HTMLElement): HTMLElement[] {
  // Split the innerHTML of the element using the <br/> tag as the delimiter
  const parts = element.innerHTML.split(/<br\s*\/?>/i);

  // Create an array of new elements
  const elements: HTMLElement[] = [];
  for (const part of parts) {
    const newElement = document.createElement('span');
    newElement.innerHTML = part;
    elements.push(newElement);
  }

  // Clear the original element's content and replace it with the new elements
  element.innerHTML = '';
  for (const newElement of elements) {
    element.appendChild(newElement);
    // Add a <br/> tag after each new element except the last one
    if (newElement !== elements[elements.length - 1]) {
      element.appendChild(document.createElement('br'));
    }
  }

  return elements;
}

export default function Cta() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const titleLineRef = useRef<HTMLSpanElement[] | null[]>([]);

  useEffect(() => {
    if (!textRef.current || !buttonRef.current) return;

    const spans = splitElementByBrTag(textRef.current);
    spans.forEach((span) => {
      const word = spliWordsBySpan(span);
      wordsRef.current.push(...word);
    });

    gsap.set(titleLineRef.current, { yPercent: 100 });
    gsap.set([buttonRef.current, wordsRef.current], { autoAlpha: 0 });
  }, []);

  const handleInview = (inView: boolean) => {
    gsap.killTweensOf([
      titleLineRef.current,
      wordsRef.current,
      buttonRef.current,
    ]);
    if (inView) {
      const tl = gsap.timeline();
      tl.to(titleLineRef.current, {
        yPercent: 0,
        duration: 1.5,
        stagger: 0.25,
        ease: 'power3.out',
      })
        .to(
          wordsRef.current,
          { autoAlpha: 1, duration: 1, stagger: 0.03 },
          '-=1.3'
        )
        .to(buttonRef.current, { autoAlpha: 1, duration: 1 }, 1.8);
    } else {
      gsap.set(titleLineRef.current, { yPercent: 100 });
      gsap.set([buttonRef.current, wordsRef.current], { autoAlpha: 0 });
    }
  };

  return (
    <section className={styles.element}>
      <Wrapper>
        <InView onChange={handleInview}>
          <h2 className={styles.title}>
            <span className={styles.title_line}>
              <span ref={(ref) => (titleLineRef.current[0] = ref)}>
                Built the User Sovereign
              </span>
            </span>
            <span className={styles.title_line}>
              <span ref={(ref) => (titleLineRef.current[1] = ref)}>
                Web with us
              </span>
            </span>
          </h2>
          <p className={styles.text} ref={textRef}>
            Unlock the full potential of user autonomy and consent in your app or <br/>
            service with Gateway’s middleware to drive your business goals.
          </p>

          <div className={styles.buttons} ref={buttonRef}>
            <Link className={styles.button_link} href='/'>
              <Button className={joinClasses(styles.button, styles['button--contained'])} variant='contained'>
                Sandbox
              </Button>
            </Link>
            <Link className={styles.button_link} href='/'>
              <Button className={styles.button} variant='text'>
                Get in Touch
              </Button>
            </Link>
          </div>

        </InView>
      </Wrapper>
    </section>
  )
}
