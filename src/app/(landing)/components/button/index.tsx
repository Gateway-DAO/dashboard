import { forwardRef, ReactNode, Ref } from 'react';

import { joinClasses } from '../../utils/function';
import styles from './button.module.scss';

type Props = {
  children?: ReactNode;
  variant: 'text' | 'contained' | 'outlined';
  onClick?: () => void;
  className?: string;
};

function Button(props: Props, ref: Ref<HTMLButtonElement>) {
  const { variant, onClick, children, className } = props;

  return (
    <button
      ref={ref}
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

export default forwardRef(Button);
