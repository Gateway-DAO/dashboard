import { joinClasses } from '../../utils/function';
import Button from '../button';
import Wrapper from '../wrapper';
import styles from './footer.module.scss';

type Props = {
  variant: 'dark' | 'light';
};

export default function Footer({ variant }: Props) {
  return (
    <section className={joinClasses(styles.element, styles[`--${variant}`])}>
      <Wrapper>
        <h2 className={styles.title}>
          Build the new age of private data with us
        </h2>
        <p className={styles.text}>
          Natively integrate our products to enable a new paradigm <br />
          in digital data. We have built the middleware needed to <br />
          facilitate and manage data sharing, ownership, and usage <br />
          that was never possible before.
        </p>

        <Button className={styles.button} variant="contained">
          Start now
        </Button>
      </Wrapper>
    </section>
  );
}
