import { useEffect } from 'react';

import { useToggle } from '@react-hookz/web';

type Props = {
  key: string;
  value: string;
};

export default function useEducational({ key, value }: Props) {
  const [showEducational, setShowEducational] = useToggle(false);

  useEffect(() => {
    const hash =
      window?.location?.hash && window?.location?.hash.indexOf(`#${key}=`) > -1
        ? window?.location?.hash.replace(`#${key}=`, '')
        : '';
    if (hash === value) {
      setShowEducational(true);
    }
  }, []);

  return { showEducational, setShowEducational };
}
