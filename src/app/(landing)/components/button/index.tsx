import { ReactNode } from 'react';

import { joinClasses } from '../../utils/function';
import styles from './button.module.scss';

type Props = {
  children?: ReactNode;
  variant: 'text' | 'contained' | 'outlined';
  onClick?: () => void;
  className?: string;
};

export default function Button({
  variant,
  onClick,
  children,
  className,
}: Props) {
  return (
    <button
      className={joinClasses(
        styles.element,
        styles[`element--${variant}`],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
