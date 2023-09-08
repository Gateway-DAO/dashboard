import GTWLink from '@/components/gtw-link';

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
            <span>Learn</span>
          </GTWLink>
          <GTWLink className={styles.link} href="/#build">
            <span>Build</span>
          </GTWLink>
        </div>
      </Wrapper>
    </nav>
  );
}
