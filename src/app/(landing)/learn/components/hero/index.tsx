import { useRef } from 'react';

import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';
import Slider from 'react-slick';

import styles from './hero.module.scss';

const conceptsCards = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of our protocol',
  },
  {
    title: 'Architecture',
    description: 'How the protocol is structured',
  },
  {
    title: 'API & SDK',
    description: 'Use the SDK from your applications',
  },
];

const solutionsCards = [
  {
    title: 'Loyalty Programs',
    description: 'Engage your community with our loyalty program protocol',
  },
  {
    title: 'Automate Issuance',
    description: 'SDK integration step-by-step',
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useHeaderVariantDetection(sectionRef, 'dark');

  const settings = {
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <h1 className={styles.title}>
          Learn Gateway basics <br />
          and <strong>get started</strong> now
        </h1>

        <div className={styles.concepts_head}>
          <p className={styles.concepts_title}>
            The basic concepts to play with Gateway
          </p>

          <div className={styles.concepts_buttons}>
            <GTWLink href="/" className={styles.concepts_link}>
              <Button variant="outlined">Get a demo</Button>
            </GTWLink>

            <GTWLink href="/" className={styles.concepts_link}>
              <Button variant="outlined">Open full documentation</Button>
            </GTWLink>
          </div>
        </div>

        <div className={styles.concepts}>
          {conceptsCards.map((card, index) => (
            <div
              className={joinClasses(styles.card, styles['card--concept'])}
              key={index}
            >
              <div className={styles.card_container}>
                <h3 className={styles.card_title}>{card.title}</h3>
                <p className={styles.card_description}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={joinClasses(
            styles.mobile_concepts,
            'slick-remove-overflow'
          )}
        >
          <Slider {...settings}>
            {conceptsCards.map((card, index) => (
              <div
                className={joinClasses(styles.card, styles['card--concept'])}
                key={index}
              >
                <div className={styles.card_container}>
                  <h3 className={styles.card_title}>{card.title}</h3>
                  <p className={styles.card_description}>{card.description}</p>
                </div>
              </div>
            ))}
          </Slider>

          <div className={styles.mobile_comcepts_buttons}>
            <GTWLink href="/" className={styles.concepts_link}>
              <Button variant="outlined">Open full documentation</Button>
            </GTWLink>
            <GTWLink href="/" className={styles.concepts_link}>
              <Button variant="outlined">Get a demo</Button>
            </GTWLink>
          </div>
        </div>

        <div className={styles.solutions}>
          <h2 className={styles.solutions_title}>What can you build?</h2>

          <p className={styles.solutions_subtitle}>
            We create different solutions with our protocol to help <br />
            organizations find the one that fits better to their context.
          </p>

          <div className={styles.solutions_cards_container}>
            {solutionsCards.map((card, index) => (
              <div
                className={joinClasses(styles.card, styles['card--solution'])}
                key={index}
              >
                <div className={styles.card_container}>
                  <h3 className={styles.card_title}>{card.title}</h3>
                  <p className={styles.card_description}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <GTWLink href="/" className={styles.solutions_link}>
            <Button variant="outlined">More use cases</Button>
          </GTWLink>
        </div>
      </Wrapper>
    </section>
  );
}
