import { useEffect, useRef, useState } from 'react';

import Link from '@/app/(landing)/components/Link';
import SectionLabel from '@/app/(landing)/components/section-label';
import ExternalLink from '@/app/(landing)/components/svgs/external-link';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { joinClasses } from '@/app/(landing)/utils/function';
import gsap from 'gsap';
import SyntaxHighlighter from 'react-syntax-highlighter';

import data from './data';
import styles from './for-developers.module.scss';
import syntaxHighlighterStyle from './syntaxHighlighterStyle';

export default function ForDevelopers() {
  const refCodes = useRef<HTMLDivElement[] | null[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.killTweensOf(refCodes.current);

    const tl = gsap.timeline();
    refCodes.current.forEach((ref, index) => {
      if (index === active) {
        tl.set(ref, { display: 'block' }, 0.2);
        tl.to(ref, { opacity: 1 }, 0.2);
      } else {
        tl.to(ref, { opacity: 0, duration: 0.2 }, 0);
        tl.set(ref, { display: 'none' }, 0.2);
      }
    });
  }, [active]);

  useHeaderVariantDetection(sectionRef, 'dark');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <SectionLabel
          className={styles.label}
          variant="purple"
          text="For Developers"
        />

        <h2 className={styles.title}>Integrate directly to your application</h2>

        <p className={styles.text}>
          Seamlessly connect to our API for effortless issuing and verifying of
          data to your users. Spend <br />
          more time on your product, less on integration hassles.
        </p>

        <a
          className={styles.link}
          href="https://docs.mygateway.xyz/api-reference/introduction"
          target="_blank"
        >
          View API documentation
          <ExternalLink className={styles.externalLink} />
        </a>

        <div className={styles.columns}>
          <div className={styles.boxes}>
            {data.map((item, index) => (
              <div
                className={joinClasses(
                  styles.box,
                  active === index ? styles['box--active'] : ''
                )}
                key={index}
                onMouseEnter={() => setActive(index)}
              >
                <div className={styles.head}>
                  <item.icon className={styles.head_icon} />
                  <h3 className={styles.head_title}>{item.title}</h3>
                </div>

                <p className={styles.box_text}>{item.description}</p>

                <div className={styles.buttons}>
                  {item.buttons.map((item, index) => item)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.code}>
            {data.map(({ code }, index) => (
              <div
                className={styles.code_container}
                key={index}
                data-lenis-prevent
                ref={(ref) => (refCodes.current[index] = ref)}
              >
                <SyntaxHighlighter
                  language="typescript"
                  style={syntaxHighlighterStyle}
                  showLineNumbers={true}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
