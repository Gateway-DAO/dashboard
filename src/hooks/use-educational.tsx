import { useEffect } from 'react';

import { useEducationalStore } from '@/app/(light)/dashboard/stores/educational.store';
import { useToggle } from '@react-hookz/web';

type Props = {
  key?: string;
  value?: string | boolean;
} | null;

export default function useEducational(props?: Props) {
  const [showEducational, setShowEducational] = useToggle(false);
  const { educational, setEducational } = useEducationalStore((state) => state);

  useEffect(() => {
    if (
      educational?.key === props?.key &&
      educational?.value === props?.value
    ) {
      setShowEducational(true);
    } else {
      setShowEducational(false);
    }
  }, [educational, showEducational]);

  return { showEducational, setEducational };
}
