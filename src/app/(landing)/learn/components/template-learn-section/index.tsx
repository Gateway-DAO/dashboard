import { ReactNode } from 'react';

import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';
import Title from '@/app/(landing)/learn/components/title';
import { joinClasses } from '@/app/(landing)/utils/function';

import Description from '../description';
import styles from './template-learn-section.module.scss';

type Props = {
  variant: 'primary' | 'secondary';
  primaryTitle: ReactNode | string;
  secondaryTitle?: ReactNode | string;
  description: ReactNode | string;
  buttonText: string;
  Vector: React.FC<{ className?: string }>;
  features: {
    icon: React.FC<{ className?: string }>;
    title: string;
    description: string;
  }[];
  highlight: {
    icon: React.FC<{ className?: string }>;
    text: string;
    info: {
      title: string;
      description: string;
      href: string;
    };
  };
  firstColumnLarger?: boolean;
};

export default function TemplateLearnSection({
  variant,
  primaryTitle,
  secondaryTitle,
  description,
  buttonText,
  Vector,
  features,
  highlight,
  firstColumnLarger,
}: Props) {
  return (
    <section
      className={joinClasses(styles.element, styles[`element--${variant}`])}
    >
      <Wrapper>
        {secondaryTitle && (
          <Title size="sm" className={styles.title_sm}>
            {secondaryTitle}
          </Title>
        )}

        <div className={joinClasses(styles.head, styles[`head--${variant}`])}>
          <div
            className={joinClasses(
              styles.head_column,
              firstColumnLarger ? styles['head_column--larger'] : ''
            )}
          >
            <Title size="lg" className={styles.title_lg}>
              {primaryTitle}
            </Title>

            <Description className={styles.text}>{description}</Description>

            <Button className={styles.button} variant="outlined">
              {buttonText}
            </Button>
          </div>

          <div
            className={joinClasses(
              styles.head_column,
              styles[`head_column--${variant}`]
            )}
          >
            <Vector className={styles.vector} />
          </div>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.features_card}>
              <div className={styles.features_card_icon_container}>
                <feature.icon className={styles.features_card_icon} />
              </div>

              <h4 className={styles.features_card_title}>{feature.title}</h4>
              <p className={styles.features_card_description}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlight_item}>
            <highlight.icon className={styles.highlight_icon} />
            <p className={styles.highlight_text}>{highlight.text}</p>
          </div>

          <a
            className={joinClasses(
              styles.highlight_item,
              styles[`highlight_item--${variant}`]
            )}
            href={highlight.info.href}
          >
            <h4 className={styles.highlight_item_title}>
              {highlight.info.title}
            </h4>
            <p className={styles.highlight_item_description}>
              {highlight.info.description}
            </p>
          </a>
        </div>
      </Wrapper>
    </section>
  );
}
