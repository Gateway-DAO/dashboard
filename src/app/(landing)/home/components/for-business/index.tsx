import Wrapper from '@/app/(landing)/components/wrapper';
import SectionLabel from '@/app/(landing)/components/section-label';
import GatewayLogo from '@/app/(landing)/components/gateway-logo';
import Link from '@/app/(landing)/components/Link';
import Button from '@/app/(landing)/components/button';
import Fingerprint from '@/app/(landing)/components/svgs/fingerprint';
import { joinClasses } from '@/app/(landing)/utils/function';

import styles from './for-business.module.scss';
import UserPrivacy from '@/app/(landing)/components/icons/user-privacy';
import DataVerifiability from '@/app/(landing)/components/icons/data-verifiability';
import Scalable from '@/app/(landing)/components/icons/scalable';
import Portable from '@/app/(landing)/components/icons/portable';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { useRef } from 'react';

const data = [
  {
    icon: UserPrivacy,
    title: 'Compliant Identity Management',
    text: 'Gateway ensures secure data facilitation and consensual verification with advanced encryption and  transparent auditing.',
    href: 'https://docs.mygateway.xyz/core-concepts/gateway-id'
  },
  {
    icon: DataVerifiability,
    title: 'Distributed Trust',
    text: 'Gateway is welcoming operators to secure the network to ensure data integrity, censorship resistance, and verifiability.',
    href: 'https://docs.mygateway.xyz/architecture/overview'
  },
  {
    icon: Scalable,
    title: 'True Data Interoperability',
    text: 'Gateway is building a suite of products to make it easy to verify and consume user data across platforms.',
    href: 'https://docs.mygateway.xyz/core-concepts/personal-data-assets'
  },
  {
    icon: Portable,
    title: 'Native User Control',
    text: 'Gateway is building Private Data Assets which turns random datastreams into a contextualized and user-controlled asset.',
    href: 'https://docs.mygateway.xyz/core-concepts/data-proofs'
  }
]

export default function ForBusiness() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <SectionLabel variant='purple' text='For Businesses' />

        <h2 className={styles.title}>
          Build apps and services <br/>
          that put users in control
        </h2>

        <div className={styles.highlight}>
          <GatewayLogo className={joinClasses(styles.item_icon, styles['logo'])} variant='light' />

          <h3 className={joinClasses(styles.item_title, styles['item_title--white'])}>
            User Consented Growth
          </h3>

          <p className={joinClasses(styles.item_text, styles['item_text--white'])}>
            Gateway enables teams to give their users control over personal <br/>
            data, allowing secure requests and sharing across the web.
          </p>

          <div className={styles.buttons}>
            <a className={styles.button_link} href='https://mygateway.xyz/login' target='_blank'>
              <Button className={joinClasses(styles.button, styles['button--contained'])} variant='contained'>
                Start Building
              </Button>
            </a>
            <a className={styles.button_link} href='https://mygateway.typeform.com/to/glphnWOS'>
              <Button className={styles.button} variant='text'>
                Get in Touch
              </Button>
            </a>
          </div>

          <Fingerprint className={styles.fingerprint} />
        </div>

        <div className={styles.items}>
          {data.map((item, index) => (
            <div className={styles.item} key={index}>
              <item.icon className={styles.item_icon} />

              <h3 className={styles.item_title}>
                {item.title}
              </h3>

              <p className={styles.item_text}>
                {item.text}
              </p>

              <a className={styles.link} href={item.href} target='_blank'></a>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
