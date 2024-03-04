import styles from './document.module.scss';
import Wrapper from '../wrapper';

export default function Document({ children }: { children: React.ReactNode}) {
  return (
    <div className={styles.element}>
      <Wrapper>
        {children}
      </Wrapper>
    </div>
  )
}
