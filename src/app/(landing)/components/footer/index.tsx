import { useState } from 'react';

import GTWLink from '@/components/gtw-link';

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

type Props = {
  variant: 'dark' | 'light';
};

const links = [
  {
    icon: LogoTwitter,
    href: '/',
  },
  {
    icon: LogoDiscord,
    href: '/',
  },
  {
    icon: LogoLinkedin,
    href: '/',
  },
  {
    icon: LogoSubstrack,
    href: '/',
  },
  {
    icon: LogoGithub,
    href: '/',
  },
];

const linksList = [
  {
    title: 'Learn',
    href: '/',
  },
  {
    title: 'Build',
    href: '/',
  },
  {
    title: 'Explorer',
    href: '/',
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

  return (
    <section className={joinClasses(styles.element, styles[`--${variant}`])}>
      <Wrapper>
        <h2 className={styles.title}>
          Build the new age of private data with us
        </h2>
        <p className={styles.text}>
          Natively integrate our products to enable a new paradigm <br />
          in digital data. We have built the middleware needed to <br />
          facilitate and manage data sharing, ownership, and usage <br />
          that was never possible before.
        </p>

        <Button className={styles.button} variant="contained">
          Start now
        </Button>

        <div className={styles.footer}>
          <GatewayLogo className={styles.logo} variant={variant} />

          <div className={styles.columns}>
            <div className={styles.column}>
              <p className={styles.copyright}>
                © 2023 Gateway Inc. All rights reserved.
              </p>

              <div className={styles.links}>
                {links.map(({ icon: Icon, href }, index) => (
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
