import { useRef } from 'react';

import ForIssues from '@/app/(landing)/components/svgs/for-issues';
import ForOwners from '@/app/(landing)/components/svgs/for-owners';
import ForVerifies from '@/app/(landing)/components/svgs/for-verifies';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';

import styles from './our-network.module.scss';

export default function OurNetwork() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <h2 className={styles.title}>Our Network</h2>

        <div className={styles.columns}>
          <GTWLink href="/learn#become-issuer" className={styles.column}>
            <h3 className={styles.column_label}>For Issuers</h3>

            <ForIssues
              className={joinClasses(
                styles.column_vector,
                styles['column_vector--issuers']
              )}
            />

            <h2 className={styles.column_title}>
              Define, Issue and <br />
              Monetize data
            </h2>

            <ul className={styles.column_list}>
              <li>Standardize unique data-sets.</li>
              <li>Programatically issue, update, and revoke PDAs</li>
              <li>Increase data usage, partnerships, and monetization. </li>
            </ul>
          </GTWLink>

          <GTWLink href="/learn#the-owners" className={styles.column}>
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
          </GTWLink>
        </div>

        <GTWLink
          href="/learn#request-user-data"
          className={styles.column_large}
        >
          <div className={styles.column_large_vector}>
            <ForVerifies className={styles.column_vector} />
          </div>
          <div className={styles.column_large_content}>
            <h3
              className={joinClasses(
                styles.column_label,
                styles['column_label--verifier']
              )}
            >
              For Verifiers
            </h3>

            <ForVerifies
              className={joinClasses(
                styles.column_vector,
                styles['column_vector--mobile-only']
              )}
            />

            <h2 className={styles.column_title}>
              Request Data
              <br />
              Build Better Products
            </h2>

            <ul className={styles.column_list}>
              <li>Encrypted requests to enable data-proofs.</li>
              <li>Empower data driven user acquisition </li>
              <li>Unlock marketing partners and user experiences.</li>
            </ul>
          </div>
        </GTWLink>
      </Wrapper>
    </section>
  );
}
