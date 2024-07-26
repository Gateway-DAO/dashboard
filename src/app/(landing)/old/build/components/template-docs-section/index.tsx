import Button from '@/app/(landing)/old/components/button';
import Wrapper from '@/app/(landing)/old/components/wrapper';
import GTWLink from '@/components/gtw-link';

import styles from './template-docs-section.module.scss';

type Props = {
  title: string;
  button: {
    text: string;
    href: string;
  };
  cards: {
    title: string;
    description: string;
    href: string;
  }[];
};

export default function TemplateDocsSection({ title, button, cards }: Props) {
  return (
    <section className={styles.element}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          <GTWLink href={button.href} target={'_blank'}>
            <Button variant="outlined">{button.text}</Button>
          </GTWLink>
        </div>

        <div className={styles.cards}>
          {cards.map((card, index) => (
            <a
              className={styles.card}
              key={index}
              href={card.href}
              target={'_blank'}
            >
              <h4 className={styles.card_title}>{card.title}</h4>
              <p className={styles.card_description}>{card.description}</p>
            </a>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
