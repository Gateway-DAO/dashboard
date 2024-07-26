import { ReactNode } from 'react';

import { joinClasses } from '@/app/(landing)/old/utils/function';

import styles from './card.module.scss';

type Props = {
  className?: string;
  svg: ReactNode;
  text: ReactNode;
};

export default function Card({ className, svg, text }: Props) {
  return (
    <div className={joinClasses(styles.element, className)}>
      {svg}
      {text}
    </div>
  );
}
