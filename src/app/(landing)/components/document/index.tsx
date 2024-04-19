import styles from './document.module.scss';
import Wrapper from '../wrapper';
import { useLenis } from '@studio-freight/react-lenis';

export default function Document({ children }: { children: React.ReactNode}) {
  const lenis = useLenis();

  lenis.scrollTo(0, { immediate: true });

  return (
    <div className={styles.element}>
      <Wrapper>
        {children}
      </Wrapper>
    </div>
  )
}
