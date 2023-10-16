import { useEffect, useRef, useState } from 'react';

import GTWLink from '@/components/gtw-link';
import gsap from 'gsap';
import { InView } from 'react-intersection-observer';

import { spliWordsBySpan } from '../../utils/dom';
import { joinClasses } from '../../utils/function';
import Button from '../button';
import GatewayLogo from '../gateway-logo';
import LogoDiscord from '../icons/logo-discord';
import LogoGithub from '../icons/logo-github';
import LogoLinkedin from '../icons/logo-linkedin';
import LogoSubstrack from '../icons/logo-substrack';
import LogoTwitter from '../icons/logo-twitter';
import Wrapper from '../wrapper';
import styles from './footer.module.scss';
import routes from '@/constants/routes';

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

type Props = {
  variant: 'dark' | 'light';
};

const linksSocial = [
  {
    icon: LogoTwitter,
    href: 'https://twitter.com/gateway_xyz',
  },
  {
    icon: LogoDiscord,
    href: '/',
  },
  {
    icon: LogoLinkedin,
    href: 'https://www.linkedin.com/company/mygateway/',
  },
  {
    icon: LogoSubstrack,
    href: 'https://mygateway.substack.com/',
  },
  {
    icon: LogoGithub,
    href: 'https://github.com/Gateway-DAO',
  },
];

const linksList = [
  {
    title: 'Learn',
    href: routes.learn,
  },
  {
    title: 'Build',
    href: routes.build,
  },
  {
    title: 'Explorer',
    href: routes.explorer,
  },
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Privacy',
    href: '/',
  },
  {
    title: 'Terms & Conditions',
    href: '/',
  },
  {
    title: 'Brand Kit',
    href: '/',
  },
  {
    title: 'Contact',
    href: '/',
  },
];

export default function Footer({ variant }: Props) {
  const [email, setEmail] = useState<string>('');
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
    <section
      className={joinClasses(styles.element, styles[`element--${variant}`])}
    >
      <Wrapper>
        <InView onChange={handleInview}>
          <h2 className={styles.title}>
            <span className={styles.title_line}>
              <span ref={(ref) => (titleLineRef.current[0] = ref)}>
                Build the new age of{' '}
              </span>
            </span>
            <span className={styles.title_line}>
              <span ref={(ref) => (titleLineRef.current[1] = ref)}>
                private data with us
              </span>
            </span>
          </h2>
          <p className={styles.text} ref={textRef}>
            Natively integrate our products to enable a new paradigm <br />
            in digital data. We have built the middleware needed to <br />
            facilitate and manage data sharing, ownership, and usage <br />
            that was never possible before.
          </p>

          <Button className={styles.button} variant="contained" ref={buttonRef}>
            Start now
          </Button>
        </InView>

        <div className={styles.footer}>
          <GatewayLogo className={styles.logo} variant={variant} />

          <div className={styles.columns}>
            <div className={styles.column}>
              <p className={styles.copyright}>
                © 2023 Gateway Inc. All rights reserved.
              </p>

              <div className={styles.links}>
                {linksSocial.map(({ icon: Icon, href }, index) => (
                  <GTWLink
                    key={index}
                    className={styles.link}
                    href={href}
                    target="_blank"
                  >
                    <Icon className={styles.link_logo} />
                  </GTWLink>
                ))}
              </div>
            </div>

            <div className={styles.column}>
              <ul className={styles.links_list}>
                {linksList.map(({ title, href }, index) => (
                  <li className={styles.links_item} key={index}>
                    <GTWLink
                      className={styles.links_link}
                      href={href}
                      target="_blank"
                    >
                      {title}
                    </GTWLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <p className={styles.subscribe_text}>
                <strong>Subscribe to our newsletter</strong>
              </p>
              <p className={styles.subscribe_text}>
                Receive news about developments and updates.
              </p>

              <input
                className={styles.input}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button className={styles.subscribe_button} variant="contained">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
