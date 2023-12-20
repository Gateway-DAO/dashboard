declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type EventConfig = {
  event_category: string;
  event_label: string;
};

export default function useGaEvent() {
  const sendEvent = (eventName: string, eventConfig?: EventConfig) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventConfig);
    }
  };

  return { sendEvent };
}
