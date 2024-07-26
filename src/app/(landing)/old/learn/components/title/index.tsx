import { ReactNode } from 'react';

import { joinClasses } from '@/app/(landing)/old/utils/function';

import styles from './title.module.scss';

type Props = {
  children?: ReactNode;
  size: 'lg' | 'sm';
  className?: string;
};

export default function Title({ children, size, className }: Props) {
  return (
    <h2
      className={joinClasses(
        styles.element,
        className,
        styles[`element--${size}`]
      )}
    >
      {children}
    </h2>
  );
}
