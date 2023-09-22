import Wrapper from '@/app/(landing)/components/wrapper';
import { joinClasses } from '@/app/(landing)/utils/function';
import Slider from 'react-slick';

import Title from '../title';
import styles from './our-products.module.scss';

const products = [
  {
    title: 'Dashboard',
    description:
      'Issuers + Verifiers can  manage private data assets (PDAs). Recipients can view and share them.',
  },
  {
    title: 'API',
    description:
      'Integrate directly with your application  to issue, manage, and verify PDAs natively.',
  },
  {
    title: 'Widget (Coming Soon)',
    description:
      'Verifiers can seamlessly request and consume PDAs  by Issuer or Dataset.',
  },
];

export default function OurProducts() {
  const settings = {
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <section className={styles.element}>
      <Wrapper>
        <Title className={styles.title} size="sm">
          Our Products
        </Title>

        <p className={styles.description}>
          We create different solutions with our protocol to help <br />
          organizations find the one that fits better to their context.
        </p>

        <div className={styles.products_container}>
          {products.map((product, index) => (
            <div className={styles.product} key={index}>
              <h4 className={styles.product_title}>{product.title}</h4>
              <p className={styles.product_description}>
                {product.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={joinClasses(
            styles.mobile_products_container,
            'slick-remove-overflow'
          )}
        >
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={index}>
                <div className={styles.product}>
                  <h4 className={styles.product_title}>{product.title}</h4>
                  <p className={styles.product_description}>
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Wrapper>
    </section>
  );
}
