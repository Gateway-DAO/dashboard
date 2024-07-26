import Wrapper from '@/app/(landing)/old/components/wrapper';
import SectionLabel from '@/app/(landing)/old/components/section-label';
import ConsumerLoyalty from '@/app/(landing)/old/components/icons/consumer-loyalty';
import Education from '@/app/(landing)/old/components/icons/education';
import FinancialHistory from '@/app/(landing)/old/components/icons/financial-history';
import Gaming from '@/app/(landing)/old/components/icons/gaming';

import styles from './use-cases.module.scss';
import { useRef } from 'react';
import useHeaderVariantDetection from '@/app/(landing)/old/hooks/use-header-variant-detection';

const data = [
  {
    icon: ConsumerLoyalty,
    title: 'Consumer Loyalty',
    text: 'Power unique loyalty experiences, perks, and partnerships.',
  },
  {
    icon: Education,
    title: 'Education',
    text: 'Prove your knowledge and education across hiring platforms.',
  },
  {
    icon: FinancialHistory,
    title: 'Financial History',
    text: 'Control access to your data for custom loans or product access.',
  },
  {
    icon: Gaming,
    title: 'Gaming',
    text: 'Build and share your gaming reputation to unlock experiences.',
  },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <SectionLabel
          className={styles.label}
          variant="purple"
          text="Use Cases"
        />

        <h2 className={styles.title}>Tooling for any Use-Case</h2>

        <p className={styles.text}>
          Gateway is designed to seamlessly integrate with your existing <br />
          data stack enabling use-cases across user sensitive industries.
        </p>

        <div className={styles.items}>
          {data.map((item, index) => (
            <div className={styles.item} key={index}>
              <item.icon className={styles.item_icon} />

              <div>
                <h3 className={styles.item_title}>{item.title}</h3>

                <p className={styles.item_text}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
