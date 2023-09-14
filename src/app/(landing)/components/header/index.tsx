import { useEffect, useRef } from 'react';

import GatewayLogo from '@/app/(landing)/components/gateway-logo';
import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';
import gsap from 'gsap';

import Button from '../button';
import styles from './header.module.scss';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const { fixed, variant } = useHeaderContext();
  const previousFixedValue = useRef(fixed);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (fixed) {
      const tl = gsap.timeline();
      tl.set(navRef.current, { position: 'fixed' });
      tl.from(navRef.current, { top: -100 });
    } else {
      const tl = gsap.timeline();

      if (previousFixedValue.current) {
        tl.to(navRef.current, { top: -100 });
      }
      tl.set(navRef.current, { position: 'absolute', clearProps: 'top' });
    }

    previousFixedValue.current = fixed;
  }, [fixed]);

  return (
    <nav
      className={joinClasses(
        styles.element,
        styles[`element--${fixed}`],
        styles[`element--${variant}`]
      )}
      ref={navRef}
    >
      <Wrapper className={styles.wrapper}>
        <GatewayLogo withName variant={variant} />

        <div className={styles.links}>
          <GTWLink className={styles.link} href="/#learn">
            <Button variant="text">Learn</Button>
          </GTWLink>
          <GTWLink className={styles.link} href="/#build">
            <Button variant="text">Build</Button>
          </GTWLink>
        </div>

        <div className={styles.buttons_container}>
          <GTWLink href="/explorer">
            <Button className={styles.button_outlined} variant="outlined">
              Explorer
            </Button>
          </GTWLink>

          <GTWLink href="/dashboard">
            <Button variant="contained">Open dashboard</Button>
          </GTWLink>
        </div>
      </Wrapper>
    </nav>
  );
}
