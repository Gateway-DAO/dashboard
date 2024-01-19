declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function useGaEvent() {
  const sendEvent = (eventName: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName);
    }
  };

  return { sendEvent };
}
