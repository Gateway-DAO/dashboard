import { useEffect, useState } from 'react';

type Props = {
  storageKey: string;
};

export default function useLocalStorageInstructionGuide({ storageKey }: Props) {
  const [visible, setVisible] = useState(false);

  let hasSeenDialog: { [storageKey: string]: boolean } | null;

  useEffect(() => {
    hasSeenDialog = JSON.parse(
      localStorage.getItem('instruction-guide') || '{}'
    );
  }, []);

  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(storageKey)) {
      setVisible(true);
    }
  }, []);

  const onSaveStorage = () => {
    hasSeenDialog = JSON.parse(
      localStorage.getItem('instruction-guide') || '{}'
    );
    const updated = { ...hasSeenDialog, [storageKey]: true };
    localStorage.setItem('instruction-guide', JSON.stringify(updated));
    setVisible(false);
  };

  return { visible, onSaveStorage };
}
