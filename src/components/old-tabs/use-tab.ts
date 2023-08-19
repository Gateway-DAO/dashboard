import { useState } from 'react';

export function useTab(scrollToTop = true) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  const setTab = (tab: number) => {
    setActiveTab(tab);
    if (scrollToTop) {
      window?.scrollTo({ top: 0 });
    }
  };

  return {
    activeTab,
    handleTabChange,
    setTab,
  };
}
