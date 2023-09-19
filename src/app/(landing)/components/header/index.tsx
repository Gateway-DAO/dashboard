import { useEffect, useRef, useState } from 'react';

import BurgerButton from '@/app/(landing)/components/burger-button';
import GatewayLogo from '@/app/(landing)/components/gateway-logo';
import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import { useIsFirstRender } from '@/app/(landing)/hooks/use-is-first-render';
import useMobileDetect from '@/app/(landing)/hooks/use-mobile.detect';
import { joinClasses } from '@/app/(landing)/utils/function';
import LenisManager, { IInstanceOptions } from '@/app/(landing)/utils/scroll';
import GTWLink from '@/components/gtw-link';

import Button from '../button';
import ArrowRight2 from '../icons/arrow-right-2';
import styles from './header.module.scss';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const { variant, setVariant } = useHeaderContext();
  const { isMobile } = useMobileDetect();
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'top' | null>(
    'top'
  );
  const previousVariant = useRef<'light' | 'dark' | null>(null);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const handleScroll = ({ direction }: IInstanceOptions) => {
      if (direction === 1) {
        setScrollDirection('down');
      } else {
        setScrollDirection('top');
      }
    };

    LenisManager?.on('scroll', handleScroll);

    return () => {
      LenisManager?.off('scroll', handleScroll);
    };
  }),
    [];

  useEffect(() => {
    if (isFirstRender) return;

    if (burgerActive) {
      previousVariant.current = variant;
      setVariant('light');
      LenisManager?.stop();
    } else {
      setVariant(previousVariant.current || 'dark');
      LenisManager?.start();
    }
  }, [burgerActive]);

  return (
    <nav
      className={joinClasses(
        styles.element,
        styles[`element--${scrollDirection}`],
        styles[`element--${variant}`],
        styles[`element--${isMobile === null && 'hide'}`]
      )}
      ref={navRef}
    >
      <Wrapper className={styles.wrapper}>
        {isMobile ? (
          <>
            <GTWLink href="/" className={styles.logo_link}>
              <GatewayLogo variant={variant} />
            </GTWLink>

            <div className={styles.mobile_buttons}>
              <GTWLink href="/dashboard">
                <Button
                  variant="contained"
                  className={styles.mobile_button_head_dashboard}
                >
                  Open dashboard
                </Button>
              </GTWLink>
              <BurgerButton
                className={styles.mobile_burger}
                active={burgerActive}
                onClick={() => setBurgerActive(!burgerActive)}
                variant={variant}
              />
            </div>
          </>
        ) : (
          <>
            <GTWLink href="/" className={styles.logo_link}>
              <GatewayLogo withName variant={variant} />
            </GTWLink>

            <div className={styles.links}>
              <GTWLink className={styles.link} href="/learn">
                <Button variant="text">Learn</Button>
              </GTWLink>
              <GTWLink className={styles.link} href="/build">
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
                <Button variant="contained" className={styles.button_contained}>
                  Open dashboard
                </Button>
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
          <GTWLink className={styles.mobile_link} href="/learn">
            <Button variant="text">
              <span>Learn</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </GTWLink>
          <GTWLink className={styles.mobile_link} href="/build">
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
              <Button
                variant="contained"
                className={styles.mobile_menu_button_link_contained}
              >
                Open dashboard
              </Button>
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
