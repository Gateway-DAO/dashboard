import { useLenis } from '@studio-freight/react-lenis';

import Wrapper from '../wrapper';
import styles from './document.module.scss';

export default function Document({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  lenis?.scrollTo(0, { immediate: true });

  return (
    <div className={styles.element}>
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
