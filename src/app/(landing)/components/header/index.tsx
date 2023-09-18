import { useEffect, useRef, useState } from 'react';

import BurgerButton from '@/app/(landing)/components/burger-button';
import GatewayLogo from '@/app/(landing)/components/gateway-logo';
import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import { useIsFirstRender } from '@/app/(landing)/hooks/use-is-first-render';
import useMobileDetect from '@/app/(landing)/hooks/use-mobile.detect';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';
import gsap from 'gsap';

import Button from '../button';
import ArrowRight2 from '../icons/arrow-right-2';
import styles from './header.module.scss';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const { fixed, variant } = useHeaderContext();
  const previousFixedValue = useRef(fixed);
  const isFirstRender = useIsFirstRender();
  const { isMobile } = useMobileDetect();
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstRender) return;

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
        styles[`element--${variant}`],
        styles[`element--${isMobile === null && 'hide'}`]
      )}
      ref={navRef}
    >
      <Wrapper className={styles.wrapper}>
        {isMobile ? (
          <>
            <GatewayLogo variant={variant} />

            <div className={styles.mobile_buttons}>
              <GTWLink href="/dashboard">
                <Button variant="contained">Open dashboard</Button>
              </GTWLink>
              <BurgerButton
                className={styles.mobile_burger}
                active={burgerActive}
                onClick={() => setBurgerActive(!burgerActive)}
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </Wrapper>

      <div
        className={joinClasses(
          styles.mobile_menu_mask,
          burgerActive ? styles['mobile_menu_mask--open'] : ''
        )}
        ref={mobileMenuRef}
      >
        <Wrapper className={styles.mobile_wrapper}>
          <GTWLink className={styles.mobile_link} href="/#learn">
            <Button variant="text">
              <span>Learn</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </GTWLink>
          <GTWLink className={styles.mobile_link} href="/#build">
            <Button variant="text">
              <span>Build</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </GTWLink>

          <div className={styles.mobile_menu_buttons}>
            <GTWLink
              className={styles.mobile_menu_button_link}
              href="/dashboard"
            >
              <Button variant="contained">Open dashboard</Button>
            </GTWLink>
            <GTWLink
              className={styles.mobile_menu_button_link}
              href="/explorer"
            >
              <Button className={styles.button_outlined} variant="outlined">
                Explorer
              </Button>
            </GTWLink>
          </div>
        </Wrapper>
      </div>
    </nav>
  );
}
