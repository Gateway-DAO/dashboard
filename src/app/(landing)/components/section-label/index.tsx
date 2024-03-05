import { joinClasses } from '../../utils/function';
import styles from './section-label.module.scss';

type Props = {
  className?: string;
  variant: 'white' | 'purple';
  text: string;
}

export default function SectionLabel({ className, variant, text }: Props) {
  return (
    <p className={joinClasses(
        styles.element,
        styles[`element--${variant}`],
        className
      )}
    >
      {text}
    </p>
  )
}
