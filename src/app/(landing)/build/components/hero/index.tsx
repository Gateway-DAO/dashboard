import Button from '@/app/(landing)/components/button';
import Link from '@/app/(landing)/components/icons/link';
import Wrapper from '@/app/(landing)/components/wrapper';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';
import { DOCS_BASE_URL } from '@/constants/docs';
import Slider from 'react-slick';

import styles from './hero.module.scss';

const journeySteps = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of our protocol',
    href: `${DOCS_BASE_URL}docs/what-is-the-gatewayprotocol`,
  },
  {
    title: 'Architecture',
    description: 'How the protocol is structured',
    href: `${DOCS_BASE_URL}docs/what-is-the-gatewayprotocol`,
  },
  {
    title: 'API & SDK',
    description: 'Use the SDK from your applications',
    href: `${DOCS_BASE_URL}graphql`,
  },
];

const Box = ({ type }: { type: 'desktop' | 'mobile' }) => {
  return (
    <div className={joinClasses(styles.box, styles[`box--${type}`])}>
      <p className={styles.box_text}>Gateway Protocol Status</p>
      <span className={styles.box_status}>LIVE</span>
      <p className={styles.box_text}>Gateway Docs Version</p>
      <p className={styles.box_text}>1.0.1</p>

      <div className={styles.box_buttons_container}>
        <GTWLink
          href={DOCS_BASE_URL}
          className={styles.box_link}
          target={'_blank'}
        >
          <Button variant="outlined">
            <span>Full Documentation</span>
            <Link className={styles.box_button_icon} />
          </Button>
        </GTWLink>

        <GTWLink
          href={`${DOCS_BASE_URL}docs/get-started-here`}
          className={styles.box_link}
          target={'_blank'}
        >
          <Button variant="outlined">
            <span>V2 API</span>
            <Link className={styles.box_button_icon} />
          </Button>
        </GTWLink>
      </div>
    </div>
  );
};

export default function Hero() {
  const settings = {
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <section className={styles.element}>
      <Wrapper className={styles.wrapper_head}>
        <div className={styles.column}>
          <h1 className={styles.title}>
            <span>Build</span> with the <br />
            Gateway Protocol
          </h1>

          <p className={styles.description}>
            Gateway is the foundation to securely create, own, manage, <br />
            and verify private data assets (PDAs) across the digital world.
          </p>
        </div>

        <Box type="desktop" />
      </Wrapper>

      <Wrapper className={styles.wrapper_bottom}>
        <p
          className={joinClasses(styles.description, styles['description--mb'])}
        >
          All you need to know to <br />
          start you journey
        </p>

        <div className={styles.steps}>
          {journeySteps.map((card, index) => (
            <a
              className={styles.card}
              key={index}
              href={card.href}
              target={'_blank'}
            >
              <h3 className={styles.card_title}>{card.title}</h3>
              <p className={styles.card_description}>{card.description}</p>
            </a>
          ))}
        </div>

        <div
          className={joinClasses(styles.mobile_steps, 'slick-remove-overflow')}
        >
          <Slider {...settings}>
            {journeySteps.map((card, index) => (
              <div key={index}>
                <a className={styles.card} href={card.href} target={'_blank'}>
                  <h3 className={styles.card_title}>{card.title}</h3>
                  <p className={styles.card_description}>{card.description}</p>
                </a>
              </div>
            ))}
          </Slider>
        </div>

        <Box type="mobile" />
      </Wrapper>
    </section>
  );
}
