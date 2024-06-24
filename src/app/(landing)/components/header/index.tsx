import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import Link from '@/app/(landing)/components/Link';
import BurgerButton from '@/app/(landing)/components/burger-button';
import GatewayLogo from '@/app/(landing)/components/gateway-logo';
import Wrapper from '@/app/(landing)/components/wrapper';
import { useHeaderContext } from '@/app/(landing)/contexts/header-context';
import { useIsFirstRender } from '@/app/(landing)/hooks/use-is-first-render';
import useMobileDetect from '@/app/(landing)/hooks/use-mobile.detect';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { isSandbox } from '@/utils/env';
import { useLenis } from '@studio-freight/react-lenis';

import { Box, CircularProgress } from '@mui/material';

import Button from '../button';
import ArrowRight2 from '../icons/arrow-right-2';
import styles from './header.module.scss';

export default function Header() {
  const session = useSession();
  const navRef = useRef<HTMLElement>(null);
  const { variant, setVariant } = useHeaderContext();
  const { isMobile, isTablet } = useMobileDetect();
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'top' | null>(
    'top'
  );
  const previousVariant = useRef<'light' | 'dark' | null>(null);
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const isFirstRender = useIsFirstRender();

  const lenis = useLenis(({ direction, scroll }) => {
    if (direction === 1 && scroll > 0) {
      setScrollDirection('down');
    } else if (direction === -1 || scroll === 0) {
      setScrollDirection('top');
    }
  });

  useEffect(() => {
    if (isFirstRender) return;
    if (burgerActive) {
      previousVariant.current = variant;
      setVariant('light');
      lenis?.stop();
    } else if (previousVariant.current) {
      setVariant(previousVariant.current || 'light');
      lenis?.start();
    }
  }, [isFirstRender, burgerActive]);

  return (
    <nav
      className={joinClasses(
        styles.element,
        styles[`element--${scrollDirection}`],
        styles[`element--${variant}`],
        styles[`element--${isMobile === null && isTablet === null && 'hide'}`]
      )}
      ref={navRef}
    >
      <Wrapper className={styles.wrapper}>
        {isMobile || isTablet ? (
          <>
            <Link href="/" className={styles.logo_link}>
              <GatewayLogo variant={variant} />
            </Link>

            <div className={styles.mobile_buttons}>
              <GTWLink
                href={
                  session.status === 'authenticated'
                    ? routes.dashboard.user.home
                    : routes.login
                }
              >
                <Button
                  variant="contained"
                  className={styles.mobile_button_head_dashboard}
                >
                  Enter the Gateway
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
            <Link href="/" className={styles.logo_link}>
              <GatewayLogo withName variant={variant} />
            </Link>

            <div className={styles.links}>
              <a
                className={styles.link}
                href="https://docs.mygateway.xyz"
                target="_blank"
              >
                <Button variant="text">Docs</Button>
              </a>
              <a className={styles.link} href="/blog">
                <Button variant="text">Blog</Button>
              </a>
              <a className={styles.link} href="/ecosystem">
                <Button variant="text">Ecosystem</Button>
              </a>
              <a className={styles.link} href="/explorer" target="_blank">
                <Button variant="text">Explorer</Button>
              </a>
              <a
                className={styles.link}
                href={
                  isSandbox
                    ? externalLinks.gateway_sandbox
                    : externalLinks.gateway
                }
                target="_blank"
              >
                <Button variant="text">
                  {isSandbox ? 'Sandbox' : 'Testnet'}
                </Button>
              </a>
            </div>

            <div className={styles.buttons_container}>
              {session.status === 'loading' && (
                <Button
                  variant="contained"
                  className={`${styles.button_contained} ${styles.loading}`}
                  disabled
                >
                  <Box
                    sx={{
                      transform: 'scale(0.75) translateY(2px)',
                    }}
                  >
                    <CircularProgress size={26} />
                  </Box>
                </Button>
              )}
              {session.status === 'authenticated' && (
                <Link href={routes.dashboard.user.home}>
                  <Button
                    variant="contained"
                    className={styles.button_contained}
                  >
                    Open dashboard
                  </Button>
                </Link>
              )}
              {session.status === 'unauthenticated' && (
                <>
                  <Link href="/login" className={styles['element--dark']}>
                    <Button
                      variant="contained"
                      className={styles.button_contained}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button
                      variant="contained"
                      className={styles.button_contained}
                    >
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
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
          <a
            className={styles.mobile_link}
            href="https://docs.mygateway.xyz"
            onClick={() => setBurgerActive(false)}
            target="_blank"
          >
            <Button variant="text">
              <span>Docs</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </a>
          <a
            className={styles.mobile_link}
            href="/blog"
            onClick={() => setBurgerActive(false)}
            target="_blank"
          >
            <Button variant="text">
              <span>Blog</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </a>
          <a
            className={styles.mobile_link}
            href="/ecosystem"
            onClick={() => setBurgerActive(false)}
            target="_blank"
          >
            <Button variant="text">
              <span>Ecosystem</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </a>
          <a
            className={styles.mobile_link}
            href="/explorer"
            onClick={() => setBurgerActive(false)}
            target="_blank"
          >
            <Button variant="text">
              <span>Explorer</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </a>
          <a
            className={styles.mobile_link}
            href={
              isSandbox ? externalLinks.gateway_sandbox : externalLinks.gateway
            }
            onClick={() => setBurgerActive(false)}
            target="_blank"
          >
            <Button variant="text">
              <span>{isSandbox ? 'Sandbox' : 'Testnet'}</span>
              <ArrowRight2 className={styles.mobile_link_arrow} />
            </Button>
          </a>

          <div className={styles.mobile_menu_buttons}>
            <Link
              className={styles.mobile_menu_button_link}
              href="/login"
              onClick={() => setBurgerActive(false)}
            >
              <Button
                variant="contained"
                className={styles.mobile_menu_button_link_contained}
              >
                Claim Gateway ID
              </Button>
            </Link>
          </div>
        </Wrapper>
      </div>
    </nav>
  );
}
