import { useRef } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';

import styles from './investors.module.scss';

const logos = [
  {
    href: 'https://www.recvc.com/',
    src: '/images/logo-reciprocal-ventures.png',
  },
  {
    href: 'https://www.hannahgrey.com/',
    src: '/images/logo-hanna-grey.png',
  },
  {
    href: 'https://redbeard.ventures/',
    src: '/images/logo-redbeard-ventures.png',
  },
  {
    href: 'https://www.figmentcapital.io/',
    src: '/images/logo-figment.png',
  },
  {
    href: 'https://www.spartangroup.io/',
    src: '/images/logo-spartan.png',
  },
  {
    href: 'https://6thman.ventures/',
    src: '/images/logo-6th-man.png',
  },
  {
    href: 'https://visary.capital/',
    src: '/images/logo-visary.png',
  },
];

const names = [
  'Sandeep Nailwal',
  'David Gan',
  'David Sneider and Chris Wiggum',
  'Ryan Selkis',
  'Stepan Simkin',
  'Ryan Li',
];

export default function Investors() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'light');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper className={styles.wrapper}>
        <h2 className={styles.title}>Investors</h2>

        <div className={styles.logos}>
          {logos.map((logo, index) => (
            <a key={index} className={styles.logo_container} href={logo.href} target='_blank'>
              <img src={logo.src} />
            </a>
          ))}
        </div>

        <div className={styles.names}>
          {names.map((name, index) => (
            <div key={index} className={styles.name_container}>
              <span className={styles.name}>{name}</span>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
