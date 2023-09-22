import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';

import Title from '../title';
import styles from './our-protocol.module.scss';

const protocols = [
  {
    title: 'Indexing practice',
    description:
      'How to organize your data and relay information from the API to storage',
  },
  {
    title: 'Our encryption solution',
    description: 'Learn how to manage, authorize, and share your PDAs.',
  },
  {
    title: 'Using Ledger',
    description:
      'Learn how we keep track and ensure the verifiability of Private Data Assets and issuances.',
  },
  {
    title: 'How we storage our data',
    description: 'Why we use Arweave to storage our data',
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

        <Button variant="outlined" className={styles.buttom}>
          Open full documentation
        </Button>

        <div className={styles.items_container}>
          {protocols.map((protocol, index) => (
            <div className={styles.item} key={index}>
              <h4 className={styles.item_title}>{protocol.title}</h4>
              <p className={styles.item_description}>{protocol.description}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
