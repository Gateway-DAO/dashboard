import { ReactNode } from 'react';

import { joinClasses } from '../../utils/function';
import styles from './wrapper.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function Wrapper({ children, className }: Props) {
  return (
    <div className={joinClasses(styles.element, className)}>{children}</div>
  );
}
