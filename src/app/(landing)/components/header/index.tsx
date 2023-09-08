import GTWLink from '@/components/gtw-link';

import Button from '../button';
import HeaderIcon from '../header-icon';
import Wrapper from '../wrapper';
import styles from './header.module.scss';

export default function Header() {
  return (
    <nav className={styles.element}>
      <Wrapper className={styles.wrapper}>
        <HeaderIcon withName />

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
            <Button variant="outlined">Explorer</Button>
          </GTWLink>

          <GTWLink href="/dashboard">
            <Button variant="contained">Open dashboard</Button>
          </GTWLink>
        </div>
      </Wrapper>
    </nav>
  );
}
