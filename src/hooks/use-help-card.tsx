import { useEffect, useState } from 'react';

type Props = {
  storageKey: string;
};

export default function useLocalStorageHelpCard({ storageKey }: Props) {
  const [visible, setVisible] = useState(false);
  let hasSeenDialog: { [storageKey: string]: boolean } | null;

  useEffect(() => {
    hasSeenDialog = JSON.parse(localStorage.getItem('help-card') || '{}');
  }, []);

  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(storageKey)) {
      setVisible(true);
    }
  }, []);

  const onRemoveStorage = () => {
    hasSeenDialog = JSON.parse(localStorage.getItem('help-card') || '{}');
    const updated = { ...hasSeenDialog, [storageKey]: true };
    localStorage.setItem('help-card', JSON.stringify(updated));
    setVisible(false);
  };

  return { visible, onRemoveStorage };
}
