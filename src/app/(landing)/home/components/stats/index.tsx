import Wrapper from '@/app/(landing)/components/wrapper';
import { joinClasses } from '@/app/(landing)/utils/function';

import styles from './stats.module.scss';

export default function Stats() {
  return (
    <section className={styles.element}>
      <Wrapper>
        <h2 className={styles.title}>
          Join the growing network solving data privacy and usage
        </h2>

        <div className={styles.stats}>
          <div className={joinClasses(styles.box, styles['box--lg'])}>
            <h3 className={styles.box_title}>Private Data Assets Created</h3>
            <span
              className={joinClasses(styles.box_value, styles['box_value--lg'])}
            >
              10,000,000
            </span>
          </div>

          <div className={styles.small_boxes_container}>
            <div className={joinClasses(styles.box, styles['box--sm'])}>
              <h3 className={styles.box_title}>Unique Issuers</h3>
              <span className={styles.box_value}>200</span>
            </div>
            <div className={joinClasses(styles.box, styles['box--sm'])}>
              <h3 className={styles.box_title}>Users Empowered</h3>
              <span className={styles.box_value}>400,000</span>
            </div>
          </div>

          <div className={joinClasses(styles.box, styles['box--md'])}>
            <h3 className={styles.box_title}>Verifications</h3>
            <span className={styles.box_value}>2,000,000</span>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
