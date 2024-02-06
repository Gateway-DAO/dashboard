import { useEffect } from 'react';

import { useCoachMarkStore } from '@/app/(light)/dashboard/stores/coach-mark.store';
import { useToggle } from '@react-hookz/web';

type Props = {
  key?: string;
  value?: string | boolean;
} | null;

export default function useCoachMark(props?: Props) {
  const [showCoachMark, setShowCoachMark] = useToggle(false);
  const { coachMark, setCoachMark } = useCoachMarkStore((state) => state);

  useEffect(() => {
    if (coachMark?.key === props?.key && coachMark?.value === props?.value) {
      setShowCoachMark(true);
    } else {
      setShowCoachMark(false);
    }
  }, [coachMark, showCoachMark]);

  return { showCoachMark, setCoachMark };
}
