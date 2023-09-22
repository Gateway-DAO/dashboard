import { ReactNode } from 'react';

import { joinClasses } from '@/app/(landing)/utils/function';

import styles from './description.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function Description({ children, className }: Props) {
  return <p className={joinClasses(styles.element, className)}>{children}</p>;
}
