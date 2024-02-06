import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';
import { DOCS_BASE_URL } from '@/constants/docs';

import Title from '../title';
import styles from './our-protocol.module.scss';

const protocols = [
  {
    title: 'Indexing practice',
    description:
      'How to organize your data and relay information from the API to storage',
    href: `${DOCS_BASE_URL}docs/get-started-here`,
  },
  {
    title: 'Our encryption solution',
    description: 'Learn how to manage, authorize, and share your PDAs.',
    href: `${DOCS_BASE_URL}docs/private-data-assets-pda`,
  },
  {
    title: 'The Explorer',
    description:
      'Learn how we keep track and ensure the state of Private Data Assets.',
    href: `${DOCS_BASE_URL}docs/data-proof`,
  },
  {
    title: 'How we store data',
    description: 'Why we use Arweave to storage data',
    href: `${DOCS_BASE_URL}docs/privacy-security-standards`,
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
          We made it easy for you to build your data strategy
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
            <a
              className={styles.item}
              key={index}
              href={protocol.href}
              target="_blank"
            >
              <h4 className={styles.item_title}>{protocol.title}</h4>
              <p className={styles.item_description}>{protocol.description}</p>
            </a>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
