import { useRef } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';

import styles from './investors.module.scss';

const logos = [
  '/images/logo-reciprocal-ventures.png',
  '/images/logo-hanna-grey.png',
  '/images/logo-redbeard-ventures.png',
  '/images/logo-figment.png',
  '/images/logo-spartan.png',
  '/images/logo-6th-man.png',
  '/images/logo-visary.png',
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
            <div key={index} className={styles.logo_container}>
              <img src={logo} />
            </div>
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
