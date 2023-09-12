import { ReactNode } from 'react';

import styles from './card.module.scss';

type Props = {
  svg: ReactNode;
  text: ReactNode;
};

export default function Card({ svg, text }: Props) {
  return (
    <div className={styles.element}>
      {svg}
      {text}
    </div>
  );
}
