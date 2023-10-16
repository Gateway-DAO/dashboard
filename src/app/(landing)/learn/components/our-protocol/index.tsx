import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';

import Title from '../title';
import styles from './our-protocol.module.scss';
import { DOCS_BASE_URL } from '@/constants/docs';

const protocols = [
  {
    title: 'Indexing practice',
    description:
      'How to organize your data and relay information from the API to storage',
    href: '/',
  },
  {
    title: 'Our encryption solution',
    description: 'Learn how to manage, authorize, and share your PDAs.',
    href: '/',
  },
  {
    title: 'Using Ledger',
    description:
      'Learn how we keep track and ensure the verifiability of Private Data Assets and issuances.',
    href: '/',
  },
  {
    title: 'How we storage our data',
    description: 'Why we use Arweave to storage our data',
    href: '/',
  },
];

export default function OurProtocol() {
  return (
    <section className={styles.element}>
      <Wrapper>
        <Title className={styles.title_sm} size="sm">
          Our Protocol
        </Title>

        <Title className={styles.title_lg} size="lg">
          We made it easy for you to build your solutions quickly and securely
        </Title>

        <Button
          variant="outlined"
          onClick={() => window.open(DOCS_BASE_URL, '_blank')}
          className={styles.buttom}
        >
          Open full documentation
        </Button>

        <div className={styles.items_container}>
          {protocols.map((protocol, index) => (
            <a className={styles.item} key={index} href={protocol.href}>
              <h4 className={styles.item_title}>{protocol.title}</h4>
              <p className={styles.item_description}>{protocol.description}</p>
            </a>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
