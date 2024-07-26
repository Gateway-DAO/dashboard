'use client';
import { useState } from 'react';

import GTWLink from '@/components/gtw-link';

import { joinClasses } from '../../utils/function';
import Button from '../button';
import GatewayLogo from '../gateway-logo';
import Wrapper from '../wrapper';
import styles from './landing-footer.module.scss';
import { linksList, linksSocial } from './links-footer';

type Props = {
  variant: 'dark' | 'light';
};

export default function LandingFooter({ variant }: Props) {
  const [email, setEmail] = useState<string>('');

  return (
    <section
      className={joinClasses(styles.element, styles[`element--${variant}`])}
    >
      <Wrapper>
        <div className={styles.footer}>
          <GatewayLogo className={styles.logo} variant={variant} />

          <div className={styles.columns}>
            <div className={styles.column}>
              <p className={styles.copyright}>
                © 2024 Gateway Inc. All rights reserved.
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
                {linksList.map(({ title, href, target }, index) => (
                  <li className={styles.links_item} key={index}>
                    <GTWLink
                      className={styles.links_link}
                      href={href}
                      target={target}
                    >
                      {title}
                    </GTWLink>
                  </li>
                ))}
                <li className={styles.links_item}>
                  <a
                    className={styles.links_link}
                    href="https://mygateway.typeform.com/to/glphnWOS"
                    target='_self'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.column}>
              <a className={styles.subscribe_link} href='https://mygateway.substack.com/subscribe?utm_source=menu&simple=true&next=https%3A%2F%2Fmygateway.substack.com%2F' target='_blank'>
                <strong>Subscribe to our newsletter</strong>
              </a>
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
