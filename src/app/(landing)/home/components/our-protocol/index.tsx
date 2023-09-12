import Card from '@/app/(landing)/components/card';
import CardId from '@/app/(landing)/components/svgs/card-id';
import CardPrivacy from '@/app/(landing)/components/svgs/card-privacy';
import CardStandardize from '@/app/(landing)/components/svgs/card-stamdardize';
import CardVerification from '@/app/(landing)/components/svgs/card-verification';
import Wrapper from '@/app/(landing)/components/wrapper';

import styles from './our-protocol.module.scss';

const cards = [
  {
    svg: <CardId className={styles.card_svg} />,
    text: (
      <>
        Multiple accounts, one <strong>ID</strong>
      </>
    ),
  },
  {
    svg: <CardStandardize className={styles.card_svg} />,
    text: (
      <>
        <strong>Standardize</strong> complex data-sets for easy consumption
      </>
    ),
  },
  {
    svg: <CardPrivacy className={styles.card_svg} />,
    text: (
      <>
        Put your <strong>privacy</strong> first. Own your data and your
        experience
      </>
    ),
  },
  {
    svg: <CardVerification className={styles.card_svg} />,
    text: (
      <>
        Encrypted data <strong>verification</strong>, public authentication.
      </>
    ),
  },
];

export default function OurProtocol() {
  return (
    <section className={styles.element}>
      <Wrapper>
        <div className={styles.head}>
          <h2 className={styles.title}>Our Protocol</h2>
        </div>

        <div className={styles.slider}>
          {cards.map((card, index) => (
            <Card
              key={index}
              svg={card.svg}
              text={<p className={styles.card_text}>{card.text}</p>}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
