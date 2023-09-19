import { useRef } from 'react';

import ForIssues from '@/app/(landing)/components/svgs/for-issues';
import ForOwners from '@/app/(landing)/components/svgs/for-owners';
import ForVerifies from '@/app/(landing)/components/svgs/for-verifies';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { joinClasses } from '@/app/(landing)/utils/function';

import styles from './our-network.module.scss';

export default function OurNetwork() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <h2 className={styles.title}>Our Network</h2>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.column_label}>For Issuers</h3>

            <ForIssues className={styles.column_vector} />

            <h2 className={styles.column_title}>
              Define, Issue and <br />
              monetize data
            </h2>

            <ul className={styles.column_list}>
              <li>Standardize unique data-sets.</li>
              <li>Programatically control PDA issuance and management.</li>
              <li>Increase data interoperability and monetization. </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.column_label}>For Owners</h3>

            <ForOwners className={styles.column_vector} />

            <h2 className={styles.column_title}>
              Empower your users to
              <br />
              own and distribute data
            </h2>

            <ul className={styles.column_list}>
              <li>Decentralized storage to ensure data ownership.</li>
              <li>Encrypted PDAs enable true data-sovereignty.</li>
              <li>Share and revoke access in a single click.</li>
            </ul>
          </div>
        </div>

        <div className={styles.column_large}>
          <div className={styles.column_large_vector}>
            <ForVerifies className={styles.column_vector} />
          </div>
          <div className={styles.column_large_content}>
            <h3 className={styles.column_label}>For Verifiers</h3>

            <ForVerifies
              className={joinClasses(
                styles.column_vector,
                styles['column_vector--mobile-only']
              )}
            />

            <h2 className={styles.column_title}>
              Verify information and
              <br />
              build better products
            </h2>

            <ul className={styles.column_list}>
              <li>A public ledger dedicated to PDA state authenticity.</li>
              <li>Encrypted requests to enable data-proofs.</li>
              <li>Unlock marketing partners and user experiences.</li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}